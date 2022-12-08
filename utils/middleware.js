const passport = require("passport")

// isLoggedIn middleware protects reserved paths for logged in users
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be logged in for this action!")
        return res.redirect("/login");
    }
    next();
}