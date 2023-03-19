const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

let client;

// Create client and connect to the database
const createClient = () => {
  try {
    client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect();
    console.log("Connected to the database");
    return client.db("CBFinalProject");
  } catch (err) {
    throw new Error(
      err?.message || "Unknown error occured during db connection"
    );
  }
};

// Close connection when the server is terminated
const closeConnection = () => {
  client.close((err) => {
    console.log("Disconnected from the database");
    // 1 - Exit with error
    if (err) {
      console.log(err);
      process.exit(1);
    }
    // 0 - Exit without error
    process.exit(0);
  });
};

// Disconnect when the server terminated by ctrl + c
process.on("SIGINT", closeConnection);

// Disconnect when the server terminated by kill command
process.on("SIGTERM", closeConnection);

module.exports = createClient();
