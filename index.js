// Import modules
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError")
const books = require("./routes/books");
const reviews = require("./routes/reviews");

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

// Serve "books" routes
app.use("/books", books);

// Serve "reviews" routes
app.use("/books/:id/reviews", reviews);

// Handle invalid path
app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404));
})

// Handle errors
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no! Something went wrong!";
    res.status(statusCode).render("books/error", { err });
})

// Listen on port 3000
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})