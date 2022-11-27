// Import modules
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Reviews = require("./models/review");
const { populate } = require("./models/review");

// Set up database connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/bookApp")
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

// GET authors: show authors from database
app.get("/books/authors", async (req, res) => {
    const books = await Book.find({});
    const authorList = books.map(book => book.author);
    const authors = [...new Set(authorList.sort())];
    res.send(authors);
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

// POST books: save book into database
app.post("/books", async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.redirect(`/books/${newBook._id}`);
})

// Listen on port 3000
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})