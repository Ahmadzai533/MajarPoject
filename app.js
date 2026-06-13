const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Mongo_Url = "mongodb://127.0.0.1:27017/wonderlust";
const Listing = require("./Models/Listing");
const path = require("path");
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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

app.get("/listing", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { listings: allListings });
});
//create route
app.get("/listing/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show route

app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  console.log(listing);
  res.render("listings/show.ejs", { listing });
});
app.post("/listing", async (req, res) => {
  // let newListting = new Listing(req.body.listing);
  // await newListting.save();
  // res.redirect("/listings");
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listing");
});
app.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  console.log(listing);
  res.render("listings/edit.ejs", { listing });
});
app.put("/listing/:id", async (req,next, res) => {
  try {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    res.redirect(`/listing/${id}`);
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});
app.delete("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listing");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
// app.get("/listings", async (req, res) => {
//   let simpleListing = new Listing({
//     title: "Beautiful Beach House",
//     description:
//       "A stunning beach house with breathtaking ocean viws, perfect for a relaxing getaway.",
//     price: 400,
//     location: "kabul, Afshar",
//     country: "Afghanistan",
//   })
//     .save()
//     .then((listing) => {
//       res.send("Listing created successfully: ");
//     });
// });
app.use((err, next, req, res) => {
  res.send("something went wrong");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
