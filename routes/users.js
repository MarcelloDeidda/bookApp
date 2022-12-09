const express = require("express");
const router = express.Router()
const passport = require("passport");
const catchAsync = require("../utils/catchAsync.js");
const ExpressError = require("../utils/ExpressError")
const User = require("../models/user");

// GET register: render register form
router.get("/register", (req, res) => {
    res.render("users/register");
})

// GET login: render login form
router.get("/login", (req, res) => {
    res.render("users/login");
})

// GET logout: logout logic
router.get("/logout", (req, res, next) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/books");
})

// POST register: register new user
router.post("/register", catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const newUser = await User.register(user, password);
        req.login(newUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome to BookApp, ${username}!`);
            res.redirect("/books");
        })
    } catch (e) {
        if (e.message.indexOf("email") != -1) {
            e.message = "A user with the give email address is already registered";
        }
        req.flash("error", e.message);
        res.redirect("/register");
    }
}))

// POST login: log in existing user
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
    const { username } = req.body;
    req.flash("success", `Welcome back ${username}!`);
    const redirectUrl = req.session.returnTo || "/books";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

module.exports = router;