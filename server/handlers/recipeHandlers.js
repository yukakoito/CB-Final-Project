const { createClient } = require('./createClient');
require('dotenv').config();
const { v4: uuidv4 } = require("uuid");
const request = require('request-promise');
const { response } = require('express');


  // This function to create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection to save the data received from API
  const recipes = db.collection('recipes')

const getRecipes = async (req, res) => {
  const {query} = req.params;

  if(!query) {
    return res.status(400).json({status: 400, message: 'Please provide ingredient(s)'})
  }

  const url = `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${query}&app_id=${process.env.EDAMAM_app_id}&app_key=${process.env.EDAMAM_app_key}&imageSize=REGULAR&random=true&field=label&field=image&field=source&field=url&field=ingredientLines&field=ingredients&field=cuisineType&field=mealType&field=dishType`

  console.log(url);

  try {

  const response = await request(url);
  const data = await JSON.parse(response);

  const recipesToSave = await data.hits.map(obj => obj.recipe = {...obj.recipe, _id: uuidv4()})
  
  const allIngredients = [];
  recipesToSave.map(recipe => {recipe.ingredients
    .forEach(ingredient => {
      !allIngredients.includes({name: ingredient.food.toLowerCase(), category: ingredient.foodCategory.toLowerCase()}) 
      && allIngredients.push({name: ingredient.food.toLowerCase(), category: ingredient.foodCategory.toLowerCase()})
    })
  })

  console.log('ALL INGREDIENTS', allIngredients);

  // This function to create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collections to save the data received from API
  const recipes = db.collection('recipes');
  const ingredients = db.collection('ingredients');

  await client.connect();
  
  // Save recipes 
  const saveRecipeResult = await recipes.insertMany(recipesToSave);

  console.log('saveRecipeResult', saveRecipeResult)

  // Update ingredients collection
  const updateIngredientsCollection = allIngredients.map(ingredient => {
    return {'updateOne': 
            {'filter': {name: ingredient.name}, 
              'update': {
                          $setOnInsert: {_id: uuidv4(), name: ingredient.name, category: ingredient.category}, 
                        }, 
             'upsert': true
            }
          }
  })

  const updateResult = await ingredients.bulkWrite(updateIngredientsCollection);
  console.log('updateResult', updateResult)

  const updatedIngredients = await ingredients.find().sort({'category': 1}).toArray();

  res.status(200).json({status: 200, recipes: recipesToSave, ingredients: updatedIngredients})

  } catch (err) {
    console.log('ERROR', err)
    res.status(500).json({status: 500, message: err})
  } finally {
    client.close();
    console.log('disconnected');
  }
}

const getSingleRecipe = async (req, res) => {

}

const getRandamRecipes = async (req, res) => {
  
}

module.exports = { getRecipes, getSingleRecipe };