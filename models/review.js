const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = newSchema({
    body: String,
    rating: Number
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;