const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ufos = require("./routes/ufos");
const dbConnect = require("./config");
const UfoModel = require("./UfoModel");

const router = express.Router();
dbConnect();

app.use("/", ufos);

const setCache = function (req, res, next) {
  //keep cache for 5 minutes
  const period = 60 * 5;

  if (req.method == "GET") {
    res.set("Cache-Control", `public, max-age=${period}`);
  } else {
    res.set("Cache-Control", `no-store`);
  }
};

app.use(setCache);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// app.get("/api/ufos/:city", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
