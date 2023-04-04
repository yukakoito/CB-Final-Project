const db = require("./createClient");
const { v4: uuidv4 } = require("uuid");
const {
  updateFoodList,
  moveItemToPantry,
  updateSavedRecipes,
  updateNotes,
} = require("../utils/userUtils");

// This function is to obtain user data for both new users and existing users
const setupUser = async (req, res) => {
  // Collection used for this function
  const users = db.collection("users");

  const { email, firstName, lastName } = req.body;

  // If email doesn't contain "@", respond with an error message
  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ status: 400, message: "Please provide user's email." });
  }

  // Data to add when creating a new user
  const newUserData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    ...req.body,
    _id: uuidv4(),
    pantry: [],
    shoppingList: [],
    savedRecipes: [],
  };

  try {
    const existingUser = await users.findOne({ email });

    // If user is found and no recipe is provided, respond with the user data
    if (existingUser) {
      return res.status(200).json({ status: 200, data: existingUser });

      // If not, create a new user to the database and respond with a newly created user data
    } else {
      const newUser = await users.insertOne(newUserData);
      if (newUser.insertedId) {
        return res.status(200).json({ status: 200, data: newUserData });
      }
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

// This function is to update all of the information stored in user's document
const updateUser = async (req, res) => {
  // Collection used for this function
  const users = db.collection("users");

  const { _id, pantry, shoppingList, moveToPantry, savedRecipes, notes } =
    req.body;

  // Validate the userId before connecting to the database
  if (!_id) {
    return res
      .status(400)
      .json({ status: 400, message: "Please provide an user id." });
  }

  try {
    const userData = await users.findOne({ _id });

    // If userData isn't found, respond with an error message
    if (!userData) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Update panty or shoppingList and respond with updated user data
    if (pantry || shoppingList) {
      return updateFoodList(req, res);
    }

    // Move an item from shoppingList to pantry
    if (moveToPantry) {
      return moveItemToPantry(req, res);
    }

    // Update savedRecipes and respond with the updated savedRecipes upon completion of the update process below.
    if (savedRecipes) {
      return updateSavedRecipes(req, res);
    }

    // Update the notes field associated with a saved recipe and respond with the updated savedRecipes
    if (notes) {
      return updateNotes(req, res);
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { setupUser, updateUser };
