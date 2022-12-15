const passport = require("passport")
const ExpressError = require("../utils/ExpressError")
const { bookSchema, reviewSchema } = require("../utils/schemas");
const Book = require("../models/book");
const Review = require("../models/review");
const User = require("../models/user");

// isLoggedIn middleware protects reserved paths for logged in users
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be logged in for this action!")
        return res.redirect("/auth/login");
    }
    next();
}

// isLoggedIn middleware protects reserved paths for logged in users
module.exports.isAdmin = (req, res, next) => {
    const { id } = req.user;
    if (id != process.env.ADMIN) {
        req.flash("error", "You do not have authorisation for this action!")
        return res.redirect(req.originalUrl);
    }
    next();
}

// bookAuthorisation middleware protects reserved paths for authorised users
module.exports.bookAuthorisation = async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book.createdBy.equals(req.user._id) && !req.user._id.equals(process.env.ADMIN)) {
        req.flash("error", "You do not have authorisation to do that!");
        return res.redirect(`/books/${id}`);
    }
    next();
}

// bookAuthorisation middleware protects reserved paths for authorised users
module.exports.reviewAuthorisation = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id) && !req.user._id.equals(process.env.ADMIN)) {
        req.flash("error", "You do not have authorisation to do that!");
        return res.redirect(`/books/${id}`);
    }
    next();
}

// userAuthorisation middleware protects reserved paths for authorised users
module.exports.userAuthorisation = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user == null) {
        req.flash("error", "This user doesn't exist!")
        return res.redirect(`/books`);
    } else if (id != req.user._id) {
        req.flash("error", "You do not have authorisation to do that!");
        return res.redirect(`/books`);
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