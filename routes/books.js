const express = require("express");
const router = express.Router()
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn, isAdmin, bookAuthorisation, validateBook } = require("../utils/middleware");
const bookController = require("../controllers/books");

router.route("/")
    // GET books: show books from database
    .get(catchAsync(bookController.index))
    // POST books: save book into database
    .post(isLoggedIn, validateBook, catchAsync(bookController.createBook));

// Get books/search: search books by title or author
router.get("/search", catchAsync(bookController.search));

// GET authors: show authors from database
router.get("/authors", catchAsync(bookController.showAuthors));

// GET authors/author: show author details
router.get("/authors/:author", catchAsync(bookController.showAuthor));

// GET new: show new book form
router.get("/new", isLoggedIn, bookController.renderNew);

router.route("/:id")
    // GET books/id: show book details
    .get(catchAsync(bookController.showBook))
    // PUT books/id: edit book details
    .put(isLoggedIn, bookAuthorisation, validateBook, catchAsync(bookController.editBook))
    // DELETE books: delete book from database
    .delete(isLoggedIn, bookAuthorisation, catchAsync(bookController.deleteBook));

// GET books/id/edit: show edit page for book
router.get("/:id/edit", isLoggedIn, bookAuthorisation, catchAsync(bookController.renderEdit));

// GET books/id/read: add book to read list
router.get("/:id/read", isLoggedIn, catchAsync(bookController.addToRead));

// GET books/id/read: remove book from read list
router.get("/:id/read/remove", isLoggedIn, catchAsync(bookController.removeFromRead));

// GET books/id/read: add book to read list
router.get("/:id/favourite", isLoggedIn, catchAsync(bookController.addToFavourite));

// GET books/id/read: remove book from read list
router.get("/:id/favourite/remove", isLoggedIn, catchAsync(bookController.removeFromFavourite));

// GET books/id/read: add book to read list
router.get("/:id/wishlist", isLoggedIn, catchAsync(bookController.addToWishlist));

// GET books/id/read: remove book from read list
router.get("/:id/wishlist/remove", isLoggedIn, catchAsync(bookController.removeFromWishlist));

module.exports = router;