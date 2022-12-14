const express = require("express");
const router = express.Router()
const passport = require("passport");
const catchAsync = require("../utils/catchAsync.js");
const authController = require("../controllers/auth");

router.route("/register")
    // GET register: render register form
    .get(authController.renderRegister)
    // POST register: register new user
    .post(catchAsync(authController.register))

router.route("/login")
    // GET login: render login form
    .get(authController.renderLogin)
    // POST login: log in existing user
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), authController.login);

// GET logout: logout logic
router.get("/logout", authController.logout);

module.exports = router;