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
  console.log("Llega a main response");
  res.send("Welcome to the UFO Api!!");
});

app.get("ufos/shape/:shape", async (req, res) => {
  if (!req.params.limit) {
    req.params.limit = 20;
  }
  console.log("llega shape");
  const result = await UfoModel.find({ shape: req.params.shape }).limit(
    req.params.limit
  );

  res.send(result);
});

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  const formattedDateString = `${year}-${month}-${day}T00:00:00`;
  console.log(formattedDateString);
  return formattedDateString;
}

app.get("/ufos/date/:date", async (req, res) => {
  if (!req.params.limit) {
    req.params.limit = 20;
  }

  try {
    const result = await UfoModel.find({
      date: formatDate(req.params.date),
    }).limit(req.params.limit);

    res.send(result);
  } catch (err) {
    res.status(200).send("Theres been an error with your request");
    console.error("Error: ", err);
  }
});

//BY STATE
app.get("/ufos/state/:state", async (req, res) => {
  if (!req.params.limit) {
    req.params.limit = 20;
  }

  try {
    const { state } = req.params;
    console.log(state);
    const result = await UfoModel.find({
      state: state.toUpperCase(),
    }).limit(req.params.limit);
    res.send(result);
  } catch (err) {
    res.status(200).send("Theres been an error with your request");
    console.error("Error: ", err);
  }
});

//BY CITY
app.get("/ufos/city/:city", async (req, res) => {
  if (!req.params.limit) {
    req.params.limit = 20;
  }

  try {
    const { city } = req.params;
    console.log(city);
    const result = await UfoModel.find({
      city: city.replace(" ", "").toLowerCase(),
    }).limit(req.params.limit);
    res.send(result);
  } catch (err) {
    res.status(200).send("Theres been an error with your request");
    console.error("Error: ", err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
