const { createClient} = require('./createClient');

const addUser= async (req, res) => {
  // Create a client
  const { client, db } = createClient('CBFinalProject');   
  // Collection used for this function
  const users = db.collection('users')
  
  const { email } = req.body;

  // Validate the user data before adding to the database
  if(Object.values(req.body).some(data => typeof data !== 'string' 
                                          || data.length === 0 
                                          || !email.includes('@'))) {
    res.status(400).json({status: 400, message: 'Please provide all of the required information.'})
  }

  // Data to add when creating a new user
  const newUserData = {
    ...req.body,
    pantry: [],
    shoppingList: [],
    savedRecipes: [],
  };

  try {
    await client.connect;
    // Verify if user is already exist in the database based on the email provided
    const existingUser = await users.find({email});
    // If user already exists respond with an error message
    if(existingUser) {
      res.status(400).json({status: 400, message: 'Please sign in to see your profile.'})
    // If not, add a new user to the database and respond with an userId
    } else {
      const newUser = await users.insertOne(newUserData);
      res.status(200).json({status: 200, data: newUser.id, message: 'User added.'})
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

  // Validate the userId before connecting to the database
  if(!userId) {
    res.status(400).json({status: 400, message: 'Please provide an user id.'})
  }

  try{
    await client.connect();
    const userData = await users.findOne({id: userId});
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

  try{
    await client.connect();
    
  }  catch (err) {
    res.status(500).json({status: 500, message: err.message})
  } finally {
    client.close();
    console.log('disconnected')
  }
}

module.exports = { getUser, addUser, updateUser }