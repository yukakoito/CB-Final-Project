'use strict';

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const { setupUser, updateUser } = require('./handlers/userHandlers.js');
const { getRecipes, getSingleRecipe } = require('./handlers/recipeHandlers.js');
const { getIngredients } = require('./handlers/ingredientHandlers');

const PORT = 8000;

express()
  .use(helmet())
  .use(morgan('tiny'))
  .use(express.json())
  .use(express.static('./server/assets'))

  // Endpoints

  .post('/api/setup-user', setupUser)
  .patch('/api/update-user', updateUser)

  .get('/api/get-ingredients', getIngredients)
  
  .get('/api/get-recipes/:query', getRecipes)
  .get('/api/get-recipe/:recipeId', getSingleRecipe)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));