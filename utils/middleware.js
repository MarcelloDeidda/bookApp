const passport = require("passport")
const ExpressError = require("../utils/ExpressError")
const { bookSchema, reviewSchema } = require("../utils/schemas");
const Book = require("../models/book");
const Review = require("../models/review");

// isLoggedIn middleware protects reserved paths for logged in users
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be logged in for this action!")
        return res.redirect("/login");
    }
    next();
}

// bookAuthorisation middleware protects reserved paths for authorised users
module.exports.bookAuthorisation = async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book.createdBy.equals(req.user._id) && !req.user._id.equals("6391fac5fddac52f420f0a4a")) {
        req.flash("error", "You do not have authorisation to do that!");
        return res.redirect(`/books/${id}`);
    }
    next();
}

// bookAuthorisation middleware protects reserved paths for authorised users
module.exports.reviewAuthorisation = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id) && !req.user._id.equals("6391fac5fddac52f420f0a4a")) {
        req.flash("error", "You do not have authorisation to do that!");
        return res.redirect(`/books/${id}`);
    }
    next();
}

// Define Book validator middleware
module.exports.validateBook = (req, res, next) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// Define Review validator middleware
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}