const db = require("./createClient");
const request = require("request-promise");
const {
  formatRecipeData,
  updateIngredientsCollection,
  deduplicateRecipes,
} = require("../utils/recipeUtils");

// This function provides recipes based on provided criteria
const getRecipes = async (req, res) => {
  const { query } = req.params;

  // If there's no query string, respond with an error message
  if (!query) {
    return res
      .status(400)
      .json({ status: 400, message: "Please provide ingredient(s)" });
  }

  const searchCriteria = query.split("&user=")[0] || query;
  const userId = query.split("&user=")[1] || null;

  const url = `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${searchCriteria}&app_id=${process.env.EDAMAM_app_id}&app_key=${process.env.EDAMAM_app_key}&random=true&field=uri&field=label&field=image&field=source&field=url&field=ingredientLines&field=ingredients&field=cuisineType&field=mealType&field=dishType`;

  try {
    // Connect to the API to get recipes based on the provided criteria
    const response = await request(url);
    const data = await JSON.parse(response);
    const searchResults = data.hits;

    // If there's no result, respond with an error message
    if (searchResults.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No recipes matching the provided criteria.",
      });
    }

    const recipes = formatRecipeData(searchResults);
    const filteredRecipes = await deduplicateRecipes(recipes, userId);
    await updateIngredientsCollection(recipes);

    res.status(200).json({
      status: 200,
      recipes: filteredRecipes,
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
      await users.updateOne(
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
