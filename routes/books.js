const express = require("express");
const router = express.Router()
const catchAsync = require("../utils/catchAsync.js");
const ExpressError = require("../utils/ExpressError")
const { bookSchema } = require("../utils/schemas");
const { sortBySurname } = require("../utils/utils.js");
const Book = require("../models/book");

// Define Book validator middleware
const validateBook = (req, res, next) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// GET books: show books from database
router.get("/", catchAsync(async (req, res) => {
    const books = await Book.find({});
    res.render("books/index", { books })
}))

// Get books/search: search books by title or author
router.get("/search", catchAsync(async (req, res) => {
    const { search } = req.query;
    const books = await Book.find({ $or: [{ title: { $regex: search, $options: "i" } }, { author: { $regex: search, $options: "i" } }] });
    res.render("books/search", { books, search });
}))

// GET authors: show authors from database
router.get("/authors", catchAsync(async (req, res) => {
    const books = await Book.find({});
    const authorList = books.map(book => book.author);
    const authors = sortBySurname(authorList);
    res.render("books/authors", { authors });
}))

// GET authors/author: show autor details
router.get("/authors/:author", catchAsync(async (req, res) => {
    const { author } = req.params;
    const booksByAuthor = await Book.find({ author });
    res.render("books/author", { booksByAuthor, author });
}))

// GET new: show new book form
router.get("/new", (req, res) => {
    res.render("books/new");
})

// GET books/id: show book details
router.get("/:id", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate("reviews");
    res.render("books/show", { book });
}))

// GET books/id/edit: show edit page for book
router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render("books/edit", { book });
}))

// POST books: save book into database
router.post("/", validateBook, catchAsync(async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.redirect(`/books/${newBook._id}`);
}))

// PUT books/id: edit book details
router.put("/:id", validateBook, catchAsync(async (req, res) => {
    const { id } = req.params;
    const newBook = await Book.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/books/${id}`);
}))

// DELETE books: delete book from database
router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.redirect("/books");
}))

module.exports = router;