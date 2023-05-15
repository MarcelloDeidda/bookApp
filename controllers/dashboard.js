const User = require("../models/user");
const similarity = require("../utils/similarity");

module.exports.showDashboard = async (req, res) => {
    const id = req.user._id;
    const time = new Date();
    const greeting = time > 17 ? "Good evening" : time > 11 ? "Good afternoon" : "Good morning";
    const recommendedBooks = await similarity.recommendBooks(id);
    const user = await User.findById(id);
    res.render("dashboard/dashboard", { user, recommendedBooks, greeting });
}