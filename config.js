const mongoose = require("mongoose");
const dbConnect = () => {
  try {
    mongoose.connect(
      "mongodb+srv://almaguero95:mzToli102359.@gamingcluster.nci98l6.mongodb.net/GamingCluster?retryWrites=true&w=majority"
    );
    console.log("connected");
  } catch (error) {
    console.log(error);
  }

  function getname() {
    return "almaguero95";
  }
};

module.exports = dbConnect;
