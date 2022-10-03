const { createClient } = require('./createClient');
require('dotenv').config();
const { v4: uuidv4 } = require("uuid");

  // This function to create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection to save the data received from API
  const recipes = db.collection('recipes')

const getRecipes = async (req, res) => {
  const {query} = req.params;

  if(!query) {
    return res.status(400).json({status: 400, message: 'Please provide ingredient(s)'})
  }

  const url = `https://api.edamam.com/api/recipes/v2?type=public&beta=false
  &q=${query}
  &app_id=${process.env.EDAMAM_app_id}
  &app_key=${process.env.EDAMAM_app_key}
  &imageSize=REGULAR
  &random=true
  &field=label&field=image&field=source&field=url&field=ingredientLines&field=ingredients&field=totalTime&field=cuisineType&field=mealType&field=dishType`

  console.log(url);

  // const options = {
  //   method: 'GET',
  //   headers: { Accept: "application/json" }
  // }

  try {

  const result = await fetch(url);
  const data = await result.json();

  const recipesToSave = await data.hits.map(hit => hit['_id'] = uuidv4())
  const allIngredients = [];
  recipesToSave.map(recipe => {recipe.ingredients
    .forEach(ingredient => {
      !allIngredients.includes({name: ingredient.food, category: ingredient.foodCategory}) 
      && allIngredients.push({name: ingredient.food, category: ingredient.foodCategory})
    })
  })

  console.log('RECIPES', recipesToSave);

  // This function to create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collections to save the data received from API
  const recipes = db.collection('recipes');
  const edamamIngredients = db.collection('edamamIngredients');

  await client.connect();
  
  // Save recipes 
  const saveRecipeResult = await recipes.insertMany(recipesToSave);

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

  const updateResult = await edamamIngredients.bulkwrite(updateIngredientsCollection);
  console.log('updateResult', updateResult)

  return res.status(200).json({status: 200, data: data})

  } catch (err) {
    res.status(500).json({status: 500, message: err.message})
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