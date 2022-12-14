const User = require("../models/user");
const Book = require("../models/book");

module.exports.showLibrary = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("library/library");
}