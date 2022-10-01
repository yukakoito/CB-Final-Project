const { createClient } = require('./createClient');
require('dotenv').config();

  // This function to create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection to save the data received from API
  const recipes = db.collection('recipes')

const getRecipes = async (req, res) => {
  const {query} = req.params;

  if(!query) {
    return res.status(400).json({status: 400, message: 'Please select a tag'})
  }

  const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Csalada&number=1&limitLicense=true';
  // const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=${query}&number=1&limitLicense=true`;

  try {
  const options = {
    method: 'GET',
    headers: {
      // 'X-RapidAPI-Key': process.env.X-RapidAPI-Key,
		  'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  }
  const res = await fetch('', options)
  const data = await res.json();

  // This function to create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection to save the data received from API
  const recipes = db.collection('recipes')
  } catch (e) {
    console.log(e);
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