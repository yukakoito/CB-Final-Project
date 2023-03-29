const db = require("../handlers/createClient");
const users = db.collection("users");
const ingredients = db.collection("ingredients");
const { v4: uuidv4 } = require("uuid");

/* Retrieve the recipe Id from uri and save it with additional data 
to manage users' savedRevipes and update the url of the food image */
const formatRecipeData = (searchResults) => {
  return searchResults.reduce((acc, cur) => {
    const recipeId = cur.recipe.uri.split("_")[1];
    cur = {
      ...cur.recipe,
      _id: recipeId,
      isLiked: false,
      isPlanned: false,
      notes: "",
    };
    acc.push(cur);
    return acc;
  }, []);
};

const getSavedRecipes = async (userId) => {
  const userData = await users.findOne({ _id: userId });
  if (!userData) return;
  return userData.savedRecipes;
};

const deduplicateRecipes = async (recipes, userId) => {
  const savedRecipes = await getSavedRecipes(userId);
  if (!savedRecipes || savedRecipes.length === 0) return;
  return await recipes.filter((recipe) =>
    savedRecipes.every((savedRecipe) => savedRecipe._id !== recipe._id)
  );
};

// Create an array of all the ingredients listed in the received from the API
const getAllIngredients = (recipes, allIngredients) => {
  return recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const name = ingredient.food.trim().toLowerCase();
      const category = ingredient.foodCategory?.trim().toLowerCase();
      return (
        !allIngredients.includes({ name: name, category: category }) &&
        allIngredients.push({ name: name, category: category })
      );
    });
  });
};

const updateIngredientsCollection = async (recipes) => {
  const allIngredients = [];
  await getAllIngredients(recipes, allIngredients);
  const addAllIngredients = allIngredients.map((ingredient) => {
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
  return await ingredients.bulkWrite(addAllIngredients);
};

module.exports = {
  formatRecipeData,
  updateIngredientsCollection,
  deduplicateRecipes,
};
