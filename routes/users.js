const express = require("express");
const router = express.Router()
const passport = require("passport");
const catchAsync = require("../utils/catchAsync.js");
const userController = require("../controllers/users");

router.route("/register")
    // GET register: render register form
    .get(userController.renderRegister)
    // POST register: register new user
    .post(catchAsync(userController.register))

router.route("/login")
    // GET login: render login form
    .get(userController.renderLogin)
    // POST login: log in existing user
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), userController.login);

// GET logout: logout logic
router.get("/logout", userController.logout);

module.exports = router;