const User = require("../models/user");
const Book = require("../models/book");

module.exports.showLibrary = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id)
        .populate("readBooks")
        .populate("favouriteBooks")
        .populate("wishlist");
    console.log("READ");
    console.log(user.readBooks);
    console.log("FAVOURITE");
    console.log(user.favouriteBooks);
    console.log("WISHLIST");
    console.log(user.wishlist);
    res.render("library/library");
}