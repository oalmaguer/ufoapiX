const csv = require("csv-parser");
const fs = require("fs");
const results = [];
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://almaguero95:mzToli102359.@gamingcluster.nci98l6.mongodb.net//?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const dbName = "GamingCluster";
const db = client.db(dbName);

// Database Name
const collection = db.collection("ufos");
fs.createReadStream("./ufo_reports.csv")
  .pipe(csv({}))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    results.forEach((data, index) => {
      // Insert the data into the MongoDB collection
      const trimmedStr = data.city.replace(/\s/g, "");
      collection.insertOne(
        {
          summary: data.summary,
          city: trimmedStr.toLowerCase(),
          shape: data.shape,
          date: data.posted,
          story: data.text,
          link: data.report_link,
          state: data.state,
          duration: data.duration,
        },
        function (err, res) {
          if (err) throw err;
          console.log("Data inserted");
        }
      );
    });
  });
