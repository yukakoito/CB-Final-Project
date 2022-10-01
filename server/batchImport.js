const ingredients = require('./data/ingredients.json');
const { createClient } = require('./handlers/createClient');
// Use this to generate unique ids
const { v4: uuidv4 } = require("uuid");

// Import the ingredient list to mongodb
const batchImport = async (data) => {
  const { client, db } = createClient('CBFinalProject');
  
  ingredients.forEach(ingredient => ingredient['_id'] = uuidv4())

  try {
    await client.connect();
    await db.collection('ingredients').insertMany(data);
    console.log('success');

  } catch (e) {
    console.log('Error!');

  } finally {
    client.close();
    console.log('disconnected');
  }
}

batchImport(ingredients);