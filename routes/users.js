const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn } = require("../utils/middleware.js");
const usersController = require("../controllers/users");

router.route("/:username")
    .get(isLoggedIn, catchAsync(usersController.showLibrary));

module.exports = router;