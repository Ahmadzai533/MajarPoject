const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },

  image: {
    filename: String,
    url: String,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
