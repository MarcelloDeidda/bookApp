const Book = require("../models/book");
const Review = require("../models/review");

// Create new review
module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    req.body.author = req.user._id;
    const review = new Review(req.body);
    book.reviews.push(review);
    await review.save();
    await book.save();
    req.flash("success", "Created new review!");
    res.redirect(`/books/${id}`);
}

// Delete review
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Deleted review!");
    res.redirect(`/books/${id}`);
}