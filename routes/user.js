const express = require("express");
const router = express.Router()
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn, userAuthorisation } = require("../utils/middleware");
const userController = require("../controllers/user");

router.route("/:id")
    .get(isLoggedIn, userAuthorisation, catchAsync(userController.showLibrary))

router.route("/:id/read")
    .get(isLoggedIn, userAuthorisation, catchAsync(userController.showRead))

router.route("/:id/favourite")
    .get(isLoggedIn, userAuthorisation, catchAsync(userController.showFavourite))

router.route("/:id/wishlist")
    .get(isLoggedIn, userAuthorisation, catchAsync(userController.showWishlist))

router.route("/:id/recommended")
    .get(isLoggedIn, userAuthorisation, catchAsync(userController.showRecommended))

module.exports = router;