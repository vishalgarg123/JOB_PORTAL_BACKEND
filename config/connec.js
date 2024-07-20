require("dotenv").config();
const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connection is connected to mongodb database`);
  } catch (error) {
    console.error(`connection is not connected to database${error}`);
  }
};

