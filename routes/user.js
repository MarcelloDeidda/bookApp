const express = require("express");
const router = express.Router()
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn, userAuthorisation } = require("../utils/middleware");
const userController = require("../controllers/user");

router.route("/:id")
    .get(isLoggedIn, userAuthorisation, catchAsync(userController.showLibrary))
    
module.exports = router;