const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const dbConnect = () => {
  console.log(process.env.DB_URI);
  try {
    mongoose.connect(process.env.DB_URI);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }

  function getname() {
    return "almaguero95";
  }
};

module.exports = dbConnect;
