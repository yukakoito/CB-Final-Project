const { createClient } = require('./createClient');
require('dotenv').config();
const { v4: uuidv4 } = require("uuid");
const request = require('request-promise');

const getRecipes = async (req, res) => {
  // This function to create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collections to save the data received from API
  const recipes = db.collection('recipes');
  const ingredients = db.collection('ingredients');

  const {query} = req.params;

  if(!query) {
    return res.status(400).json({status: 400, message: 'Please provide ingredient(s)'})
  }

  const url = `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${query}&app_id=${process.env.EDAMAM_app_id}&app_key=${process.env.EDAMAM_app_key}&random=true&field=label&field=image&field=source&field=url&field=ingredientLines&field=ingredients&field=cuisineType&field=mealType&field=dishType`

  console.log(url);

  try {

  const response = await request(url);
  const data = await JSON.parse(response);

  if(data.hits.length === 0) {
    return res.status(404).json({status: 404, message: 'No recipes matching the provided criteria.'})
  }

  const recipeResults = await data.hits.map(obj => obj = {...obj.recipe})


  console.log('RECIPE RESULTS', recipeResults)
  
  const allIngredients = [];
  recipeResults.forEach(recipe => {recipe.ingredients
    .forEach(ingredient => {
      const name = ingredient.food.toLowerCase()
      const category = ingredient.foodCategory?.toLowerCase()
      !allIngredients.includes({name: name, category: category}) 
      && allIngredients.push({name: name, category: category})
    })
  })

  console.log('ALL INGREDIENTS', allIngredients);

  await client.connect();
  
  // Save recipes in the database just in case...
  const saveRecipes = recipeResults.map(recipe => {
    return {'updateOne': 
    {'filter': {label: recipe.label}, 
      'update': {
                  $setOnInsert: {...recipe, _id: uuidv4()}, 
                }, 
     'upsert': true
    }
  }
  })
  const saveRecipeResult = await recipes.bulkWrite(saveRecipes);

  console.log('saveRecipeResult', saveRecipeResult)

  // Update ingredients collection
  const updateIngredientsCollection = allIngredients.map(ingredient => {
    return {'updateOne': 
            {'filter': {name: ingredient.name}, 
              'update': {
                          $setOnInsert: {_id: uuidv4(), name: ingredient.name}, 
                          $set: {category: ingredient.category}
                        }, 
             'upsert': true
            }
          }
  })

  const updateResult = await ingredients.bulkWrite(updateIngredientsCollection);
  console.log('updateResult', updateResult)

  const updatedIngredients = await ingredients.find().sort({'category': 1}).toArray();

  res.status(200).json({status: 200, recipes: recipeResults, ingredients: updatedIngredients})

  } catch (err) {
    console.log('ERROR', err)
    res.status(500).json({status: 500, message: err})
  } finally {
    client.close();
    console.log('disconnected');
  }
}

const getRandamRecipes = async (req, res) => {
  
}

module.exports = { getRecipes };