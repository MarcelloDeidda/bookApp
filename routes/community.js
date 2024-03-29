const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn } = require("../utils/middleware.js");
const communityController = require("../controllers/community");

router.route("/:username")
    .get(isLoggedIn, catchAsync(communityController.showLibrary));

router.route("/:username/read")
    .get(isLoggedIn, catchAsync(communityController.showRead))

router.route("/:username/favourite")
    .get(isLoggedIn, catchAsync(communityController.showFavourite))

router.route("/:username/wishlist")
    .get(isLoggedIn, catchAsync(communityController.showWishlist))

router.route("/:username/follow")
    .patch(isLoggedIn, catchAsync(communityController.follow))

router.route("/:username/unfollow")
    .patch(isLoggedIn, catchAsync(communityController.unfollow))

module.exports = router;