const { createClient } = require('./createClient');
// Use this to generate unique ids
const { v4: uuidv4 } = require("uuid");

const setupUser= async (req, res) => {
  // Create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection used for this function
  const users = db.collection('users')
  
  const { email } = req.body;

  // Data to add when creating a new user
  const newUserData = {
    ...req.body,
    _id: uuidv4(),
    pantry: [],
    shoppingList: [],
    savedRecipes: [],
    meals: []
  };

  // console.log('NEW USER DATA', newUserData)

  try {
    await client.connect;
    // If user already exists in the database based on the email provided, respond with the user data
    // const existingUser = await users.findOne({email});
    const existingUser = await users.findOne({email})
    // console.log('existingUser', existingUser)
    if(existingUser) {
      res.status(200).json({status: 200, data: existingUser})
    // If not, create a new user to the database and respond with a newly created user data
    } else {
      const newUser = await users.insertOne(newUserData);
      // console.log('newUser', newUser)
      newUser.insertedId && res.status(200).json({status: 200, data: newUserData})
    }
  } catch (err) {
    res.status(500).json({status: 500, message: err.message})
  } finally {
    client.close();
    console.log('disconnected')
  }
}

const updateUser = async (req, res) => {
  // Create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection used for this function
  const users = db.collection('users')

  const { _id, pantry, shoppingList, savedRecipes, moveToPantry, meals, notes } = req.body;
  console.log('REQ.BODY', req.body)

  // Validate the userId before connecting to the database
  if(!_id) {
    res.status(400).json({status: 400, message: 'Please provide an user id.'})
  }

  try {
    await client.connect();
    const userData = await users.findOne({_id});
  
    // If useData isn't found, respond with an error message
    if(!userData) {
      return res.status(404).json({status: 404, message: 'User not found'})
    }

    let updatedUserData;
    let updateResult = {};

    // Update panty or shoppingList and respond with updated user data
    if (pantry || shoppingList) {
      const key = Object.keys(req.body).find(key => key !== '_id')
      const value = req.body[key] 
      const itemToRemove = {[key]: value}
      // When adding an item to a list, sort the array by category and then name.
      const itemToAdd = {[key]: {
                                $each: [value],
                                $sort: {category: -1, name: 1}
                              }}
      
      // If the item already exists in the list, remove it.
      updateResult = await users.updateOne({_id}, {$pull: itemToRemove});
      console.log(updateResult)
      if(updateResult.modifiedCount === 1) {
        updatedUserData = await users.findOne({_id})
        return res.status(200).json({status: 200, [key]: updatedUserData[key], message: 'Item removed'})
      // If the item is not found, add it to the list.
      } else {
        updateResult = await users.updateOne({_id}, {$push: itemToAdd});
        console.log(updateResult)
        if(updateResult.modifiedCount === 1) {
          updatedUserData = await users.findOne({_id})
          return res.status(200).json({status: 200, [key]: updatedUserData[key], message: 'Item added'})
        }
        return res.status(501).json({status: 501, message: 'An unknown error has occured.'})
    }}

    // Update savedRecipes or myMeals
    if (savedRecipes || meals) {
      const query = Object.fromEntries([Object.entries(req.body).find(([key, value]) => key !== '_id')]);
      const key = Object.keys(query).toString();
      console.log({key}, query)
      updateResult = await users.updateOne({_id}, {$pull: query});
      console.log(updateResult)
      if(updateResult.modifiedCount === 1) {
        updatedUserData = await users.findOne({_id})
        return res.status(200).json({status: 200, [key]: updatedUserData[key], message: 'Recipe deleted'})
      } else {
        updateResult = await users.updateOne({_id}, {$push: query});
        console.log(updateResult)
        if(updateResult.modifiedCount === 1) {
          updatedUserData = await users.findOne({_id})
          return res.status(200).json({status: 200, [key]: updatedUserData[key], message: 'Recipe saved'})
        }
        return res.status(501).json({status: 501, message: 'An unknown error has occured.'})
    }}

    // Move an item from shoppingList to pantry
    if(moveToPantry) {
      updateResult = await users.updateOne({_id}, {$pull: {shoppingList: moveToPantry}, $addToSet: {pantry: moveToPantry}})
    
      console.log(updateResult)
      if(updateResult.modifiedCount === 1) {
        // Sort items in pantry before sending the updated data to FE
        await users.updateOne({_id}, {$push: {pantry: { $each: [], $sort: {category: -1, name: 1}}}})
        updatedUserData = await users.findOne({_id})
        return res.status(200).json({status: 200, data: updatedUserData, message: 'Item moved to Pantry'})
      } else {
        return res.status(501).json({status: 501, message: 'An unknown error has occured.'})
      }
    }

    // Add notes to or update notes associated with an recipe in meals and/or savedRevipes
    if(notes) {
      console.log(notes.notes)
      const updateNotes = await users.updateOne({_id}, 
                                                {$set: {"meals.$[elem].notes": notes.notes, 
                                                        "savedRecipes.$[elem].notes": notes.notes}
                                                }, 
                                                {arrayFilters: [{"elem.label": notes.label}]}
                                              )
      console.log(updateNotes)
      updatedUserData = await users.findOne({_id})
      return res.status(200).json({status: 200, data: updatedUserData, message: 'Notes updated'})
    }

  } catch (err) {
    res.status(500).json({status: 500, message: err.message})
  } finally {
    client.close();
    console.log('disconnected')
  }
}

module.exports = { setupUser, updateUser }