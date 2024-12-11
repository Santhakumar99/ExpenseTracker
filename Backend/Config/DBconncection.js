const mongoose = require("mongoose");
const config = require("config");
require('dotenv').config();
// const urlStr ="mongodb://localhost:27017/ExpenseTracker";
const urlStr = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(urlStr, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    // Exit process with db connection failure
    // process.exit(1);
  }
};

module.exports = connectDB;