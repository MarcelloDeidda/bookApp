const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn, reviewAuthorisation, validateReview } = require("../utils/middleware");
const Book = require("../models/book");
const Review = require("../models/review");

// POST review: save review for book
router.post("/", isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    req.body.author = req.user._id;
    const review = new Review(req.body);
    book.reviews.push(review);
    await review.save();
    await book.save();
    req.flash("success", "Created new review!");
    res.redirect(`/books/${id}`);
}))

// DELETE reviews: delete review from book
router.delete("/:reviewId", isLoggedIn, reviewAuthorisation, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Deleted review!");
    res.redirect(`/books/${id}`);
}))

module.exports = router
