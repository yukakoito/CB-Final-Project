const { createClient} = require('./createClient');

  // This function to create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection used for this function
  const TBD = db.collection('TBD')

const getRecipes = async (req, res) => {

}

const getSingleRecipe = async (req, res) => {

}

module.exports = { getRecipes, getSingleRecipe };