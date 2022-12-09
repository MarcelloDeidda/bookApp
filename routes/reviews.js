const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn, reviewAuthorisation, validateReview } = require("../utils/middleware");
const reviewController = require("../controllers/reviews");

// POST review: save review for book
router.post("/", isLoggedIn, validateReview, catchAsync(reviewController.createReview));

// DELETE reviews: delete review from book
router.delete("/:reviewId", isLoggedIn, reviewAuthorisation, catchAsync(reviewController.deleteReview));

module.exports = router
