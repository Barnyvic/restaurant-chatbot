const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  const mongodbURL = process.env.MONGODB_URL || "mongodb://0.0.0.0:27017/";
  try {
    //connecting to the database
    await mongoose.connect(mongodbURL);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { dbConnection };