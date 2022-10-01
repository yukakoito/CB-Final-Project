const { createClient } = require('./createClient');
// Use this to generate unique ids
const { v4: uuidv4 } = require("uuid");

const addUser= async (req, res) => {
  // Create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection used for this function
  const users = db.collection('users')
  
  const { email } = req.body;

  // Validate the user data before adding to the database
  if(Object.values(req.body)
      .some(data => typeof data !== 'string' 
                    || data.length === 0 
                    || !email.includes('@'))
    ) {
    res.status(400).json({status: 400, message: 'Please provide all of the required information.'})
  }

  // Data to add when creating a new user
  const newUserData = {
    ...req.body,
    _id: uuidv4(),
    pantry: [],
    shoppingList: [],
    savedRecipes: [],
  };

  try {
    await client.connect;
    // Verify if user is already exist in the database based on the email provided
    const existingUser = await users.findOne({email});
    console.log(existingUser)
    // If user already exists respond with an error message
    if(existingUser) {
      res.status(400).json({status: 400, message: 'Please sign in to see your profile.'})
    // If not, add a new user to the database and respond with an userId
    } else {
      const newUser = await users.insertOne(newUserData);
      res.status(200).json({status: 200, data: newUser._id, message: 'User added.'})
    }

  } catch (err) {
    res.status(500).json({status: 500, message: err.message})
  } finally {
    client.close();
    console.log('disconnected')
  }
}

const getUser = async (req, res) => {
  // Create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection used for this function
  const users = db.collection('users')

  const { userId } = req.params;
  console.log(userId)

  // Validate the userId before connecting to the database
  if(!userId) {
    res.status(400).json({status: 400, message: 'Please provide an user id.'})
  }

  try{
    await client.connect();
    const userData = await users.findOne({_id: userId});
    userData? 
    // If userData is found, respond with user information
    res.status(200).json({status: 200, data: userData})
    :
    // If not, respond with an error message
    res.status(404).json({status: 404, message: 'User not found'})

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

  const { _id, pantry, shoppingList, savedRecipes, moveToPantry } = req.body;
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
    let sortedArray = [];

    // Update panty or shoppingList and respond with updated user data
    if (pantry || shoppingList) {
      const query = Object.fromEntries([Object.entries(req.body).find(([key, value]) => key !== '_id')]);
      const key = Object.keys(query).toString();
      console.log({key}, query)
      updateResult = await users.updateOne({_id}, {$pull: query});
      console.log(updateResult)
      if(updateResult.modifiedCount === 1) {
        updatedUserData = await users.findOne({_id})
        sortedArray = await updatedUserData[key].sort((a, b) => {
          if(a.category < b.category) {
            return -1;
          } else if(a.category > b.category) {
            return 1;
          }
          return 0;
        })
        return res.status(200).json({status: 200, [key]: sortedArray, message: 'Item removed'})
      } else {
        updateResult = await users.updateOne({_id}, {$push: query});
        console.log(updateResult)
        if(updateResult.modifiedCount === 1) {
          updatedUserData = await users.findOne({_id})
          sortedArray = await updatedUserData[key].sort((a, b) => {
            if(a.category < b.category) {
              return -1;
            } else if(a.category > b.category) {
              return 1;
            }
            return 0;
          })
          return res.status(200).json({status: 200, [key]: sortedArray, message: 'Item added'})
        }
        return res.status(501).json({status: 501, message: 'An unknown error has occured.'})
    }}

    // Move an item from shoppingList to pantry
    if(moveToPantry) {
      updateResult = await users.updateOne({_id}, {$pull:{shoppingList: moveToPantry}, $addToSet: {pantry: moveToPantry}})
      console.log(updateResult)
      if(updateResult.modifiedCount === 1) {
        updatedUserData = await users.findOne({_id})
        return res.status(200).json({status: 200, data: updatedUserData, message: 'Item moved to Pantry'})
      } else {
        return res.status(501).json({status: 501, message: 'An unknown error has occured.'})
      }
    }

  } catch (err) {
    res.status(500).json({status: 500, message: err.message})
  } finally {
    client.close();
    console.log('disconnected')
  }
}

module.exports = { getUser, addUser, updateUser }