const Book = require("../models/book");
const { sortBySurname } = require("../utils/utils.js");

// Show books from database
module.exports.index = async (req, res) => {
    const books = await Book.find({});
    res.render("books/index", { books })
}

// Search books by title or author
module.exports.search = async (req, res) => {
    const { search } = req.query;
    const books = await Book.find({ $or: [{ title: { $regex: search, $options: "i" } }, { author: { $regex: search, $options: "i" } }] });
    res.render("books/search", { books, search });
}

// Show authors from database
module.exports.showAuthors = async (req, res) => {
    const books = await Book.find({});
    const authorList = books.map(book => book.author);
    const authors = sortBySurname(authorList);
    res.render("books/authors", { authors });
}

// Show books by author
module.exports.showAuthor = async (req, res) => {
    const { author } = req.params;
    const booksByAuthor = await Book.find({ author });
    if (!booksByAuthor[0]) {
        req.flash("error", "Cannot find that author!");
        return res.redirect("/books/authors");
    }
    res.render("books/author", { booksByAuthor, author });
}

// Render New Book form
module.exports.renderNew = (req, res) => {
    res.render("books/new");
}

// Show book details
module.exports.showBook = async (req, res, next) => {
    admin = process.env.ADMIN
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
    res.render("books/show", { book, admin });
}

// Render Edit Book form
module.exports.renderEdit = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        req.flash("error", "Cannot find that book!");
        return res.redirect("/books");
    }
    res.render("books/edit", { book });
}

// Create new book
module.exports.createBook = async (req, res) => {
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
}

// Edit book details
module.exports.editBook = async (req, res) => {
    try {
        const { id } = req.params;
        const newBook = await Book.findByIdAndUpdate(id, req.body, { runValidators: true });
        req.flash("success", "Successfully updated new book!");
        res.redirect(`/books/${id}`);
    } catch (e) {
        req.flash("error", e);
        res.redirect(`/books/${id}`);
    }
}

// Delete book
module.exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        req.flash("success", "Successfully deleted book!");
        res.redirect("/books");
    } catch (e) {
        req.flash("error", e);
        res.redirect(`/books/${id}`);
    }
}