'use strict';

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const { getUser, addUser, updateUser} = require('./handlers/userHandlers.js');
const { getRecipes, getSingleRecipe} = require('./handlers/recipeHandlers.js');

const PORT = 8000;

express()
  .use(helmet())
  .use(morgan('tiny'))
  .use(express.json())
  .use(express.static('./server/assets'))

  // Endpoints

  .get('/api/get-user/:userId', getUser)
  .post('/api/add-user', addUser)
  .patch('/api/update-user', updateUser)

  .get('/api/get-recipes', getRecipes)
  .get('/api/get-recipe/:recipeId', getSingleRecipe)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));