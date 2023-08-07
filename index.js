const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ufos = require("./routes/ufos");
const dbConnect = require("./config");
const UfoModel = require("./UfoModel");

const router = express.Router();
dbConnect();

const setCache = function (req, res, next) {
  //keep cache for 5 minutes
  const period = 60 * 5;

  if (req.method == "GET") {
    res.set("Cache-Control", `public, max-age=${period}`);
  } else {
    res.set("Cache-Control", `no-store`);
  }
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// app.get("/api/ufos/:city", routes);
app.get("/", async (req, res) => {
  res.send(`
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
  <h1>Welcome to the UFO Api!!</h1>
  
  <a href="https://www.buymeacoffee.com/mrtembo" target="__blank">Buy me a coffee :)</a>
  </div>
  `);
});

app.get("/ufos/shape/:shape/page/:page?", async (req, res) => {
  const page = parseInt(req.params.page) || 1; // Extract the "page" parameter from the query string
  // Use the "page" value to determine the skip value for pagination
  const skip = (page - 1) * 20;
  try {
    const result = await UfoModel.find({
      shape: req.params.shape,
    })
      .skip(skip)
      .limit(20);

    res.send(result);
  } catch (err) {
    res.status(200).send("Theres been an error with your request");
    console.error("Error: ", err);
  }
});

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  const formattedDateString = `${year}-${month}-${day}T00:00:00`;
  console.log(formattedDateString);
  return formattedDateString;
}

app.get("/ufos/date/:date/page/:page?", async (req, res) => {
  const page = parseInt(req.params.page) || 1; // Extract the "page" parameter from the query string

  // Use the "page" value to determine the skip value for pagination
  const skip = (page - 1) * 20;

  try {
    const result = await UfoModel.find({
      date: formatDate(req.params.date),
    })
      .skip(skip)
      .limit(20);

    res.status(200).send(result);
  } catch (err) {
    res.status(200).send("Theres been an error with your request");
    console.error("Error: ", err);
  }
});

//BY STATE
app.get("/ufos/state/:state/page/:page?", async (req, res) => {
  const page = parseInt(req.params.page) || 1; // Extract the "page" parameter from the query string

  // Use the "page" value to determine the skip value for pagination
  const skip = (page - 1) * 20;

  try {
    const { state } = req.params;
    console.log(state);
    const result = await UfoModel.find({
      state: state.replace(" ", "").toLowerCase().toUpperCase(),
    })
      .skip(skip)
      .limit(20);
    res.status(200).send(result);
  } catch (err) {
    res.status(200).send("Theres been an error with your request");
    console.error("Error: ", err);
  }
});

//BY CITY
app.get("/ufos/city/:city/page/:page?", async (req, res) => {
  const page = parseInt(req.params.page) || 1; // Extract the "page" parameter from the query string

  // Use the "page" value to determine the skip value for pagination
  const skip = (page - 1) * 20;

  try {
    const { city } = req.params;
    console.log(city);
    const result = await UfoModel.find({
      city: city.replace(" ", "").toLowerCase(),
    })
      .skip(skip)
      .limit(20);
    res.status(200).send(result);
  } catch (err) {
    res.status(200).send("Theres been an error with your request");
    console.error("Error: ", err);
  }
});

//RANDOM
app.get("/ufos", async (req, res) => {
  const page = parseInt(req.params.page) || 1; // Extract the "page" parameter from the query string

  // Use the "page" value to determine the skip value for pagination
  const skip = (page - 1) * 20;

  try {
    UfoModel.aggregate([{ $sample: { size: 20 } }]);
    const { city } = req.params;
    console.log(city);
    const result = await UfoModel.aggregate([{ $sample: { size: 20 } }])
      .skip(skip)
      .limit(20);
    res.status(200).send(result);
  } catch (err) {
    res.status(200).send("Theres been an error with your request");
    console.error("Error: ", err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
