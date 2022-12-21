const User = require("../models/user");
const Book = require("../models/book");
const similarity = require("../utils/similarity");

module.exports.showLibrary = async (req, res, next) => {
    const { id } = req.params;
    const recommendedBooks = await similarity.recommendBooks(id);
    const user = await User.findById(id)
        .populate("readBooks")
        .populate("favouriteBooks")
        .populate("wishlist");
    res.render("library/library", { user, recommendedBooks });
}

module.exports.showRead = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
        .populate("readBooks");
    const bookList = user.readBooks;
    res.render("library/list", { bookList, role: "Read Books" })
}

module.exports.showFavourite = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
        .populate("favouriteBooks");
    const bookList = user.favouriteBooks;
    res.render("library/list", { bookList, role: "Favourite Books" })
}

module.exports.showWishlist = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
        .populate("wishlist");
    const bookList = user.wishlist;
    res.render("library/list", { bookList, role: "Wishlist" })
}

module.exports.showRecommended = async (req, res) => {
    const { id } = req.params;
    const bookList = await similarity.recommendBooks(id);
    res.render("library/list", { bookList, role: "Recommended Books" })
}