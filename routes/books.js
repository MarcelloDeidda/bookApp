const express = require("express");
const router = express.Router()
const catchAsync = require("../utils/catchAsync.js");
const { sortBySurname } = require("../utils/utils.js");
const { isLoggedIn, bookAuthorisation, validateBook } = require("../utils/middleware");
const Book = require("../models/book");

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

// GET authors/author: show author details
router.get("/authors/:author", catchAsync(async (req, res) => {
    const { author } = req.params;
    const booksByAuthor = await Book.find({ author });
    if (!booksByAuthor[0]) {
        req.flash("error", "Cannot find that author!");
        return res.redirect("/books/authors");
    }
    res.render("books/author", { booksByAuthor, author });
}))

// GET new: show new book form
router.get("/new", isLoggedIn, (req, res) => {
    res.render("books/new");
})

// GET books/id: show book details
router.get("/:id", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("createdBy");
    if (!book) {
        req.flash("error", "Cannot find that book!");
        return res.redirect("/books");
    }
    res.render("books/show", { book });
}))

// GET books/id/edit: show edit page for book
router.get("/:id/edit", isLoggedIn, bookAuthorisation, catchAsync(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        req.flash("error", "Cannot find that book!");
        return res.redirect("/books");
    }
    res.render("books/edit", { book });
}))

// POST books: save book into database
router.post("/", isLoggedIn, validateBook, catchAsync(async (req, res) => {
    try {
        req.body.createdBy = req.user._id;
        const newBook = new Book(req.body);
        await newBook.save();
        req.flash("success", "Successfully created new book!");
        res.redirect(`/books/${newBook._id}`);
    } catch (e) {
        req.flash("error", e);
        return res.redirect("/books/new");
    }
}))

// PUT books/id: edit book details
router.put("/:id", isLoggedIn, bookAuthorisation, validateBook, catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const newBook = await Book.findByIdAndUpdate(id, req.body, { runValidators: true });
        req.flash("success", "Successfully updated new book!");
        res.redirect(`/books/${id}`);
    } catch (e) {
        req.flash("error", e);
        res.redirect(`/books/${id}`);
    }
}))

// DELETE books: delete book from database
router.delete("/:id", isLoggedIn, bookAuthorisation, catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        req.flash("success", "Successfully deleted book!");
        res.redirect("/books");
    } catch (e) {
        req.flash("error", e);
        res.redirect(`/books/${id}`);
    }
}))

module.exports = router;