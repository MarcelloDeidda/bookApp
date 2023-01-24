const User = require("../models/user");
const Book = require("../models/book");

module.exports.showLibrary = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username })
        .populate("readBooks")
        .populate("favouriteBooks")
        .populate("wishlist");
    res.render("community/library", { user });
}

module.exports.showRead = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username })
        .populate("readBooks")
    const bookList = user.readBooks;
    res.render("community/list", { username, bookList, role: "Read Books" })
}

module.exports.showFavourite = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username })
        .populate("favouriteBooks");
    const bookList = user.favouriteBooks;
    res.render("community/list", { username, bookList, role: "Favourite Books" })
}

module.exports.showWishlist = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username })
        .populate("wishlist");
    const bookList = user.wishlist;
    res.render("community/list", { username, bookList, role: "Wishlist" })
}