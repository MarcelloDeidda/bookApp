const User = require("../models/user");
const Book = require("../models/book");

module.exports.showLibrary = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username })
        .populate("readBooks")
        .populate("favouriteBooks")
        .populate("wishlist");;
    res.render("community/library", { user });
}