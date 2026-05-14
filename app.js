const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Mongo_Url = "mongodb://127.0.0.1:27017/wonderlust";
const Listing = require("./Models/Listing");

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(Mongo_Url);
}

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/listing", async (req, res) => {
  let simpleListing = new Listing({
    title: "Beautiful Beach House",
    description:
      "A stunning beach house with breathtaking ocean viws, perfect for a relaxing getaway.",
    price: 400,
    location: "kabul, Afshar",
    country: "Afghanistan",
  })
    .save()
    .then((listing) => {
      res.send("Listing created successfully: ");
    });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
