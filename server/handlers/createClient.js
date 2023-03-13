require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

let client;

const createClient = () => {
  try {
    client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect();
    return client.db("CBFinalProject");
  } catch (err) {
    throw new Error(err?.message || "Unknown error occurred at db connection");
  }
};

const closeConnection = () => {
  client.close((err) => {
    if (err) {
      console.error(err);
      // 1 - exit with error
      process.exit(1);
    }

    console.log("Connection to MongoDB server closed");
    // 0 - exit without error
    process.exit(0);
  });
};

// disconnect when the server terminated by ctrl+c
process.on("SIGINT", closeConnection);
// disconnect when the server terminated by kill command
process.on("SIGTERM", closeConnection);

module.exports = createClient();
