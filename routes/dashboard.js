const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn } = require("../utils/middleware");
const dashboardController = require("../controllers/dashboard");

router.route("/")
    .get(isLoggedIn, catchAsync(dashboardController.showDashboard));    

module.exports = router;