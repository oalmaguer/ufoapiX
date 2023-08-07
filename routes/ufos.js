const express = require("express");
const router = express.Router();
const UfoModel = require("../UfoModel");
const app = express();

//Search by shape
router.get("/", async (req, res) => {
  console.log("Llega a main response");
  res.send("Welcome to the UFO Api!!");
});

router.get("ufos/shape/:shape", async (req, res) => {
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

router.get("/ufos/date/:date", async (req, res) => {
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
router.get("/ufos/state/:state", async (req, res) => {
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
router.get("/ufos/city/:city", async (req, res) => {
  if (!req.params.limit) {
    req.params.limit = 20;
  }

  try {
    const { city } = req.params;
    console.log("params: ", req.params);
    const result = await UfoModel.find({
      city: city.toLowerCase(),
    }).limit(req.params.limit);
    res.json(result);
  } catch (err) {
    res.status(200).send("Theres been an error with your request");
    console.error("Error: ", err);
  }
});

module.exports = router;
