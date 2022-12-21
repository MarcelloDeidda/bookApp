const similarity = require("string-similarity");
const Book = require("../models/book");
const User = require("../models/user");
const mongoose = require("mongoose");

// Set up database connection
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect("mongodb://localhost:27017/bookAppDatabase");
}

module.exports.recommendBooks = async (userId) => {
    const books = await Book.find({});
    const user = await User.findById(userId)
        .populate("favouriteBooks");
    const unreadBooks = books.filter((book) => !user.readBooks.includes(book.id));
    const favouriteBooks = user.favouriteBooks;
    if (favouriteBooks.length < 5) {
        return false;
    }
    const recommendedBooks = [];
    for (let book of unreadBooks) {
        favouriteSimilarity = [];
        for (let fav of favouriteBooks) {
            favouriteSimilarity.push(similarity.compareTwoStrings(book.summary, fav.summary));
        }
        score = favouriteSimilarity.reduce((a, b) => a + b) / favouriteBooks.length;
        recommendedBooks.push({ id: book.id, score });
    }
    const recommendedList = recommendedBooks.sort((a, b) => b.score - a.score).slice(0, 10).map(book => book.id);
    return unreadBooks.filter(book => recommendedList.includes(book.id));
}