const Book = require("../models/book");
const User = require("../models/user");
const { sortBySurname } = require("../utils/utils.js");
const categories = require("../utils/categories");

// Show books from database
module.exports.index = async (req, res) => {
    let { order } = req.query;
    const books = await Book.find({});
    let bookList = [];
    switch (order) {
        case "title":
            bookList = books.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
            break;
        case "yearAsc":
            bookList = books.sort((a, b) => a.year - b.year);
            break;
        case "yearDesc":
            bookList = books.sort((a, b) => b.year - a.year);
            break;
        default:
            bookList = books.sort((a, b) => 0.5 - Math.random());
            order = "random"
            break;
    }
    res.render("books/index", { books: bookList, order });
}

// Search books by title or author
module.exports.search = async (req, res) => {
    const { search } = req.query;
    let { order } = req.query;
    const books = await Book.find({ $or: [{ title: { $regex: search, $options: "i" } }, { author: { $regex: search, $options: "i" } }] });
    let bookList = [];
    switch (order) {
        case "title":
            bookList = books.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
            break;
        case "yearAsc":
            bookList = books.sort((a, b) => a.year - b.year);
            break;
        case "yearDesc":
            bookList = books.sort((a, b) => b.year - a.year);
            break;
        default:
            bookList = books.sort((a, b) => 0.5 - Math.random());
            order = "random"
            break;
    }
    res.render("books/search", { books: bookList, order, search });
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
    let { order } = req.query;
    const booksByAuthor = await Book.find({ author });
    if (!booksByAuthor[0]) {
        req.flash("error", "Cannot find that author!");
        return res.redirect("/books/authors");
    }
    let bookList = [];
    switch (order) {
        case "title":
            bookList = booksByAuthor.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
            break;
        case "yearAsc":
            bookList = booksByAuthor.sort((a, b) => a.year - b.year);
            break;
        case "yearDesc":
            bookList = booksByAuthor.sort((a, b) => b.year - a.year);
            break;
        default:
            bookList = booksByAuthor.sort((a, b) => 0.5 - Math.random());
            order = "random"
            break;
    }
    res.render("books/author", { order, booksByAuthor: bookList, author });
}

// Show authors from database
module.exports.showCategories = async (req, res) => {
    res.render("books/categories", { categories });
}

// Show books by author
module.exports.showCategory = async (req, res) => {
    const { category } = req.params;
    if (!categories.includes(category)) {
        req.flash("error", "Cannot find that category!");
        return res.redirect("/books/categories");
    }
    let { order } = req.query;
    const booksByCategory = await Book.find({ category });
    let bookList = [];
    switch (order) {
        case "title":
            bookList = booksByCategory.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
            break;
        case "yearAsc":
            bookList = booksByCategory.sort((a, b) => a.year - b.year);
            break;
        case "yearDesc":
            bookList = booksByCategory.sort((a, b) => b.year - a.year);
            break;
        default:
            bookList = booksByCategory.sort((a, b) => 0.5 - Math.random());
            order = "random"
            break;
    }
    res.render("books/category", { booksByCategory: bookList, order, category });
}

// Render New Book form
module.exports.renderNew = (req, res) => {
    res.render("books/new", { categories });
}

// Show book details
module.exports.showBook = async (req, res, next) => {
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
}

// Render Edit Book form
module.exports.renderEdit = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
        req.flash("error", "Cannot find that book!");
        return res.redirect("/books");
    }
    res.render("books/edit", { book, categories });
}

// Create new book
module.exports.createBook = async (req, res) => {
    try {
        req.body.createdBy = req.user._id;
        console.log(typeof req.category)
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

// Add book to read list
module.exports.addToRead = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        if (user.readBooks.indexOf(id) === -1 && user.wishlist.indexOf(id) === -1) {
            user.readBooks.push(id);
            user.save();
            req.flash("success", "This book was added to your library!");
            res.redirect(`/books/${id}`);
        } else {
            req.flash("error", "This book is already in your library!");
            res.redirect(`/books/${id}`);
        }
    } catch (e) {
        const { id } = req.params;
        req.flash("error", e);
        res.redirect(`/books/${id}`);
    }
}

// Remove book from read list
module.exports.removeFromRead = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        if (user.readBooks.indexOf(id) > -1) {
            await user.readBooks.remove(id);
            if (user.favouriteBooks.indexOf(id) > -1) {
                user.favouriteBooks.remove(id);
            }
            user.save();
            req.flash("success", "This book was removed from your library!");
            res.redirect(`/books/${id}`);
        } else {
            req.flash("error", "This book is not in your library!");
            res.redirect(`/books/${id}`);
        }
    } catch (e) {
        const { id } = req.params;
        req.flash("error", e);
        res.redirect(`/books/${id}`);
    }
}

// Add book to favourite list
module.exports.addToFavourite = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        if (user.favouriteBooks.indexOf(id) === -1 && user.wishlist.indexOf(id) === -1) {
            user.favouriteBooks.push(id);
            if (user.readBooks.indexOf(id) === -1) {
                user.readBooks.push(id);
            }
            user.save();
            req.flash("success", "This book was added to your favourites!");
            res.redirect(`/books/${id}`);
        } else {
            req.flash("error", "This book is already in your library!");
            res.redirect(`/books/${id}`);
        }
    } catch (e) {
        const { id } = req.params;
        req.flash("error", e);
        res.redirect(`/books/${id}`);
    }
}

// Remove book from favourite list
module.exports.removeFromFavourite = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        if (user.favouriteBooks.indexOf(id) > -1) {
            await user.favouriteBooks.remove(id);
            user.save();
            req.flash("success", "This book was removed from your favourites!");
            res.redirect(`/books/${id}`);
        } else {
            req.flash("error", "This book is not in your favourites!");
            res.redirect(`/books/${id}`);
        }
    } catch (e) {
        const { id } = req.params;
        req.flash("error", e);
        res.redirect(`/books/${id}`);
    }
}

// Add book to wishlist
module.exports.addToWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        if (user.wishlist.indexOf(id) === -1 && user.readBooks.indexOf(id) === -1) {
            user.wishlist.push(id);
            user.save();
            req.flash("success", "This book was added to your wishlist!");
            res.redirect(`/books/${id}`);
        } else {
            req.flash("error", "This book is already in your library!");
            res.redirect(`/books/${id}`);
        }
    } catch (e) {
        const { id } = req.params;
        req.flash("error", e);
        res.redirect(`/books/${id}`);
    }
}

// Remove book from wishlist
module.exports.removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        if (user.wishlist.indexOf(id) > -1) {
            await user.wishlist.remove(id);
            user.save();
            req.flash("success", "This book was removed from your wishlist!");
            res.redirect(`/books/${id}`);
        } else {
            req.flash("error", "This book is not in your wishlist!");
            res.redirect(`/books/${id}`);
        }
    } catch (e) {
        const { id } = req.params;
        req.flash("error", e);
        res.redirect(`/books/${id}`);
    }
}