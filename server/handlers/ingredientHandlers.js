const { createClient } = require('./createClient');
require('dotenv').config();
const parameters = require('../data/parameters')

// Get all of the ingredients in the database and the parameters used for receipe search
const getIngredients = async (req, res) => {
  // This function to create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection to save the data received from API
  const ingredients = db.collection('ingredients')

  try {
    await client.connect();
    const data = await ingredients.find().sort({'category': 1}).toArray();
    data.length > 0 ?
    res.status(200).json({status: 200, data: {ingredients: data, parameters: parameters}}): 
    res.status(404).json({status: 404, message: "Data not found"});
    
  } catch(err) {
    res.status(500).json({status: 500, data: req.body, message: err.message})

  } finally {
    client.close();
    console.log('disconnected')
  }
}

module.exports = { getIngredients }