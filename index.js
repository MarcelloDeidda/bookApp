if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Import modules
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");
const ExpressError = require("./utils/ExpressError")
const bookRouter = require("./routes/books");
const reviewRouter = require("./routes/reviews");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const User = require("./models/user");
const MongoStore = require("connect-mongo");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/bookAppDatabase";

// Set up database connection
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
    console.log("CONNECTED TO MONGOOSE");
}

// Initialise express server
const app = express();

// Set up options: url, json, method_override, static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());

// Set up session and flash
const sessionConfig = {
    store: MongoStore.create({
        mongoUrl: dbUrl,
        secret: process.env.SECRET || "abc",
        touchAfter: 24 * 60 * 60
    }),
    secret: process.env.SECRET || "abc",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

// Set up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up local variables
app.use((req, res, next) => {
    if (!["/auth/login", "/"].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user;
    if (req.user) {
        res.locals.isAdmin = (req.user.id == process.env.ADMIN);
    } else {
        res.locals.isAdmin = false;
    }
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

// Set up views path
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve "auth" routes
app.use("/auth", authRouter);

// Serve "books" routes
app.use("/books", bookRouter);

// Serve "reviews" routes
app.use("/books/:id/reviews", reviewRouter);

// Serve "user" routes
app.use("/library", userRouter);

app.get("/", (req, res) => {
    res.render("home");
})

// Handle invalid path
app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404));
})

// Handle errors
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no! Something went wrong!";
    console.log(err);
    res.status(statusCode).render("books/error", { err });
})

// Listen on port 3000
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})