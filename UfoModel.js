const mongoose = require("mongoose");

// Define the schema
const UfoSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    summary: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    shape: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    story: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
  },
  { collection: "ufos" }
);

// Create the model
const UfoModel = mongoose.model("UfoModel", UfoSchema);

module.exports = UfoModel;
