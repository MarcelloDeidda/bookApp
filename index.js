// Import modules
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Review = require("./models/review");
const { sortBySurname } = require("./utils/utils.js");

// Set up database connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/bookAppDatabase")
    console.log("CONNECTED TO MONGOOSE");
}

// Initialise express server
const app = express();

// Setting up options: url, json, method_override, static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Set up views path
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// GET books: show books from database
app.get("/books", async (req, res) => {
    const books = await Book.find({});
    res.render("books/index", { books })
})

// Get books/search: search books by title or author
app.get("/books/search", async (req, res) => {
    const { search } = req.query;
    const books = await Book.find({ $or: [{ title: { $regex: search, $options: "i" } }, { author: { $regex: search, $options: "i" } }] });
    res.render("books/search", { books, search });
})

// GET authors: show authors from database
app.get("/books/authors", async (req, res) => {
    const books = await Book.find({});
    const authorList = books.map(book => book.author);
    const authors = sortBySurname(authorList);
    res.render("books/authors", { authors });
})

// GET authors/author: show autor details
app.get("/books/authors/:author", async (req, res) => {
    const { author } = req.params;
    const booksByAuthor = await Book.find({ author });
    res.render("books/author", { booksByAuthor, author });
})

// GET new: show new book form
app.get("/books/new", (req, res) => {
    res.render("books/new");
})

// GET books/id: show book details
app.get("/books/:id", async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate("reviews");
    res.render("books/show", { book });
})

// GET books/id/edit: show edit page for book
app.get("/books/:id/edit", async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render("books/edit", { book });
})

// POST books: save book into database
app.post("/books", async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.redirect(`/books/${newBook._id}`);
})

// POST review: save review for book
app.post("/books/:id/", async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    const review = new Review(req.body.review);
    book.reviews.push(review);
    await review.save();
    await book.save();
    res.redirect(`/books/${id}`);
})

// PUT books/id: edit book details
app.put("/books/:id", async (req, res) => {
    const { id } = req.params;
    const newBook = await Book.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/books/${id}`);
})

// DELETE books: delete book from database
app.delete("/books/:id", async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.redirect("/books");
})

// DELETE reviews: delete review from book
app.delete("/books/:bookId/reviews/:reviewId", async (req, res) => {
    const { bookId, reviewId } = req.params;
    await Book.findByIdAndUpdate(bookId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/books/${bookId}`);
})

// Listen on port 3000
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})