"use strict";

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const { setupUser, updateUser } = require("./handlers/userHandlers.js");
const {
  getRecipes,
  updateImageSource,
} = require("./handlers/recipeHandlers.js");
const { getData } = require("./handlers/dataHandlers");

const PORT = 8000;

express()
  .use(helmet())
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("./server/assets"))

  // Endpoints

  .post("/api/setup-user", setupUser)
  .patch("/api/update-user", updateUser)

  .get("/api/get-data", getData)

  .get("/api/get-recipes/:query", getRecipes)
  .get("/api/update-image-source/:query", updateImageSource)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
