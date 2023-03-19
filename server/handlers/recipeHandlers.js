const db = require("./createClient");
const { v4: uuidv4 } = require("uuid");
const request = require("request-promise");

// This function provides recipes based on provided criteria
const getRecipes = async (req, res) => {
  // Collection to save the data received from API
  const ingredients = db.collection("ingredients");
  const { query } = req.params;

  // If there's no query string, respond with an error message
  if (!query) {
    return res
      .status(400)
      .json({ status: 400, message: "Please provide ingredient(s)" });
  }

  const url = `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${query}&app_id=${process.env.EDAMAM_app_id}&app_key=${process.env.EDAMAM_app_key}&random=true&field=uri&field=label&field=image&field=source&field=url&field=ingredientLines&field=ingredients&field=cuisineType&field=mealType&field=dishType`;

  try {
    // Connect to the API to get un updated image source
    const response = await request(url);
    const data = await JSON.parse(response);

    // If there's no result, respond with an error message
    if (data.hits.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No recipes matching the provided criteria.",
      });
    }

    // Retrieve the recipe Id from uri and save it with additional data
    // to manage users' savedRecipes and update the url of the food image
    const recipeResults = [];
    await data.hits.map((obj) => {
      const recipeId = obj.recipe.uri.split("_")[1];
      obj = {
        ...obj.recipe,
        _id: recipeId,
        isLiked: false,
        isPlanned: false,
        notes: "",
      };
      recipeResults.push(obj);
    });

    // Create an array of all the ingredients listed in the received from the API
    const allIngredients = [];
    recipeResults.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const name = ingredient.food.toLowerCase();
        const category = ingredient.foodCategory?.toLowerCase();
        !allIngredients.includes({ name: name, category: category }) &&
          allIngredients.push({ name: name, category: category });
      });
    });

    // Update ingredients collection
    const updateIngredientsCollection = allIngredients.map((ingredient) => {
      return {
        updateOne: {
          filter: { name: ingredient.name },
          update: {
            $setOnInsert: { _id: uuidv4(), name: ingredient.name },
            $set: { category: ingredient.category },
          },
          upsert: true,
        },
      };
    });

    const updateResult = await ingredients.bulkWrite(
      updateIngredientsCollection
    );

    // Retrieve the updated list of ingredients from the database to send it to the FE
    const updatedIngredients = await ingredients
      .find()
      .sort({ category: 1 })
      .toArray();

    res.status(200).json({
      status: 200,
      recipes: recipeResults,
      ingredients: updatedIngredients,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

// This function is to update the image source of saved recipes
const updateImageSource = async (req, res) => {
  const { query } = req.params;

  // If there's no query string, respond with an error message
  if (!query) {
    return res
      .status(400)
      .json({ status: 400, message: "Please provide recipeId and/or userId" });
  }

  // Collection to save the data received from API
  const users = db.collection("users");

  const recipeId = query
    .split("&")
    .find((ele) => ele.includes("recipeId"))
    ?.replace("recipeId=", "");
  const userId = query
    .split("&")
    .find((ele) => ele.includes("userId"))
    ?.replace("userId=", "");
  const url = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&beta=false&app_id=${process.env.EDAMAM_app_id}&app_key=${process.env.EDAMAM_app_key}&field=uri&field=image`;

  try {
    // Fetch the API to get an updated image source
    const response = await request(url);
    const data = await JSON.parse(response);

    // If an updated image source is received,
    // replace the current image source with the updated one in user's savedRecipes array and then respond with the updated image source
    if (data.recipe.image) {
      const updateSavedRecipe = await users.updateOne(
        { _id: userId },
        { $set: { "savedRecipes.$[elem].image": data.recipe.image } },
        { arrayFilters: [{ "elem._id": recipeId }] }
      );

      return res
        .status(200)
        .json({ status: 200, updatedImgSrc: data.recipe.image });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Could not find an image with the specified recipeId.",
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

module.exports = { getRecipes, updateImageSource };
