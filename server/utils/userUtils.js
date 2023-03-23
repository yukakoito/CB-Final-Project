const db = require("../handlers/createClient");
const users = db.collection("users");
const ingredients = db.collection("ingredients");
let updatedUserData;
let updateResult = {};

const updateFoodList = async (req, res) => {
  const { _id } = req.body;
  const listName = Object.keys(req.body).find((key) => key !== "_id");
  const itemValue = req.body[listName];
  const item = { [listName]: itemValue };

  // When adding an item to a list, update an .
  const updatedItemValue = {
    ...itemValue,
    category: await updateItemCategory(itemValue),
  };

  // When adding an item to a list, sort the array by category and then name.
  const itemToAdd = {
    [listName]: {
      $each: [updatedItemValue],
      $sort: { category: -1, name: 1 },
    },
  };

  // If the item already exists in the list, remove it.
  updateResult = await users.updateOne({ _id }, { $pull: item });

  if (updateResult.modifiedCount === 1) {
    updatedUserData = await users.findOne({ _id });
    return res.status(200).json({
      status: 200,
      [listName]: updatedUserData[listName],
      message: "Item removed",
    });
    // If the item is not found, add it to the list.
  } else {
    updateResult = await users.updateOne({ _id }, { $push: itemToAdd });

    if (updateResult.modifiedCount === 1) {
      updatedUserData = await users.findOne({ _id });
      return res.status(200).json({
        status: 200,
        [listName]: updatedUserData[listName],
        message: "Item added",
      });
    }
    return res
      .status(501)
      .json({ status: 501, message: "An unknown error has occured." });
  }
};

const updateItemCategory = async (itemValue) => {
  const { category, name } = itemValue;
  const uncategorized = " others";

  if (category && category !== uncategorized) return category;

  try {
    const ingredient = await ingredients.findOne({ name: name });
    const newCategory = await ingredient?.category;
    return newCategory || uncategorized;
  } catch (err) {
    console.log(err);
    return uncategorized;
  }
};

module.exports = { updateFoodList };
