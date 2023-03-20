const db = require("./createClient");
const { v4: uuidv4 } = require("uuid");

// This function is to obtain user data for both new users and existing users
const setupUser = async (req, res) => {
  // Collection used for this function
  const users = db.collection("users");

  const { email, recipe } = req.body;

  // If email doesn't contain "@", respond with an error message
  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ status: 400, message: "Please provide user's email." });
  }

  // Reformat the data received from FE to add to new user's document
  const data = Object.fromEntries(
    Object.entries(req.body).filter(([key, value]) => key !== "recipe")
  );
  // Data to add when creating a new user
  const newUserData = {
    ...data,
    _id: uuidv4(),
    pantry: [],
    shoppingList: [],
    savedRecipes: recipe ? [recipe] : [],
  };

  try {
    const existingUser = await users.findOne({ email });

    // If user is found and no recipe is provided, respond with the user data
    if (existingUser && !recipe) {
      return res.status(200).json({ status: 200, data: existingUser });

      // If user is found and there's a recipe to save, add the recipe to user's savedRecipes
      // and then respond with the updated user data
    } else if (existingUser && recipe) {
      await users.updateOne(
        { _id: existingUser._id },
        { $addToSet: { savedRecipes: recipe } }
      );
      const updatedUserData = await users.findOne({ _id: existingUser._id });
      updatedUserData &&
        res.status(200).json({ status: 200, data: updatedUserData });

      // If not, create a new user to the database and respond with a newly created user data
    } else {
      const newUser = await users.insertOne(newUserData);
      newUser.insertedId &&
        res.status(200).json({ status: 200, data: newUserData });
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

    let updatedUserData;
    let updateResult = {};

    // Update panty or shoppingList and respond with updated user data
    if (pantry || shoppingList) {
      const key = Object.keys(req.body).find((key) => key !== "_id");
      const value = req.body[key];
      const itemToRemove = { [key]: value };
      // When adding an item to a list, sort the array by category and then name.
      const itemToAdd = {
        [key]: {
          $each: [value],
          $sort: { category: -1, name: 1 },
        },
      };

      // If the item already exists in the list, remove it.
      updateResult = await users.updateOne({ _id }, { $pull: itemToRemove });

      if (updateResult.modifiedCount === 1) {
        updatedUserData = await users.findOne({ _id });
        return res.status(200).json({
          status: 200,
          [key]: updatedUserData[key],
          message: "Item removed",
        });
        // If the item is not found, add it to the list.
      } else {
        updateResult = await users.updateOne({ _id }, { $push: itemToAdd });

        if (updateResult.modifiedCount === 1) {
          updatedUserData = await users.findOne({ _id });
          return res.status(200).json({
            status: 200,
            [key]: updatedUserData[key],
            message: "Item added",
          });
        }
        return res
          .status(501)
          .json({ status: 501, message: "An unknown error has occured." });
      }
    }

    // Move an item from shoppingList to pantry
    if (moveToPantry) {
      updateResult = await users.updateOne(
        { _id },
        {
          $pull: { shoppingList: moveToPantry },
          $addToSet: { pantry: moveToPantry },
        }
      );

      if (updateResult.modifiedCount === 1) {
        // Sort items in pantry before sending the updated data to FE
        await users.updateOne(
          { _id },
          { $push: { pantry: { $each: [], $sort: { category: -1, name: 1 } } } }
        );
        updatedUserData = await users.findOne({ _id });
        return res.status(200).json({
          status: 200,
          data: updatedUserData,
          message: "Item moved to Pantry",
        });
      } else {
        return res
          .status(501)
          .json({ status: 501, message: "An unknown error has occured." });
      }
    }

    // Update savedRecipes and respond with the updated savedRecipes upon completion of the update process below.
    if (savedRecipes) {
      // Delete the recipe from savedRecipes when both isLiked and isPlanned are false
      if (!savedRecipes.isLiked && !savedRecipes.isPlanned) {
        updateResult = await users.updateOne(
          { _id },
          { $pull: { savedRecipes: { _id: savedRecipes._id } } }
        );
        if (updateResult.modifiedCount === 1) {
          updatedUserData = await users.findOne({ _id });
          return res.status(200).json({
            status: 200,
            savedRecipes: updatedUserData.savedRecipes,
            message: "Recipe deleted",
          });
        }
        return res
          .status(501)
          .json({ status: 501, message: "An unknown error has occured." });
      } else {
        // If the recipe is in savedRecipes, update the required field
        updateResult = await users.updateOne(
          { _id },
          {
            $set: {
              "savedRecipes.$[elem].isLiked": savedRecipes.isLiked,
              "savedRecipes.$[elem].isPlanned": savedRecipes.isPlanned,
            },
          },
          { arrayFilters: [{ "elem._id": savedRecipes._id }] }
        );
        if (updateResult.modifiedCount === 1) {
          updatedUserData = await users.findOne({ _id });
          return res.status(200).json({
            status: 200,
            savedRecipes: updatedUserData.savedRecipes,
            message: "Recipe updated",
          });
        } else {
          // Add the recipe if it's not in savedRecipes
          updateResult = await users.updateOne(
            { _id },
            { $addToSet: { savedRecipes } }
          );
          if (updateResult.modifiedCount === 1) {
            updatedUserData = await users.findOne({ _id });
            return res.status(200).json({
              status: 200,
              savedRecipes: updatedUserData.savedRecipes,
              message: "Recipe updated",
            });
          }
          return res
            .status(501)
            .json({ status: 501, message: "An unknown error has occured." });
        }
      }
    }

    // Update the notes field associated with a saved recipe and respond with the updated savedRecipes
    if (notes) {
      updateResult = await users.updateOne(
        { _id },
        { $set: { "savedRecipes.$[elem].notes": notes.notes } },
        { arrayFilters: [{ "elem._id": notes._id }] }
      );
      if (updateResult.modifiedCount === 1) {
        updatedUserData = await users.findOne({ _id });
        return res.status(200).json({
          status: 200,
          savedRecipes: updatedUserData.savedRecipes,
          message: "Notes updated",
        });
      }
      return res
        .status(501)
        .json({ status: 501, message: "An unknown error has occured." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { setupUser, updateUser };
