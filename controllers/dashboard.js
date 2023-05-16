const User = require("../models/user");
const axios = require("axios");
const similarity = require("../utils/similarity");

module.exports.showDashboard = async (req, res) => {
    const id = req.user._id;

    const date = new Date();
    const time = date.getHours();
    const greeting = time > 17 ? "Good evening" : time > 11 ? "Good afternoon" : "Good morning";

    const url = `https://api.api-ninjas.com/v1/quotes?category=knowledge`;
    const config = {
        headers: {
            "X-Api-Key": process.env.QUOTE_API_KEY
        }
    }

    let quote = {};

    await axios.get(url, config)
        .then((res) => {
            quote.author = res.data[0].author;
            quote.quote = `"${res.data[0].quote}"`;
            quote.success = true;
        })
        .catch(() => {
            quote.author = "";
            quote.quote = "Couldn't fetch quotes!"
            quote.success = false;
        });
    
    const user = await User.findById(id);
    const recommendedBooks = await similarity.recommendBooks(id);

    res.render("dashboard/dashboard", { user, recommendedBooks, greeting, quote });
}