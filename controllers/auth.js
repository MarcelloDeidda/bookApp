const User = require("../models/user");

// Render register form
module.exports.renderRegister = (req, res) => {
    if (req.user) {
        req.flash("error", "You are already logged in!");
        return res.redirect(`/library/${req.user.id}`)
    }
    res.render("auth/register");
}

// Render login form
module.exports.renderLogin = (req, res) => {
    if (req.user) {
        req.flash("error", "You are already logged in!");
        return res.redirect(`/library/${req.user.id}`)
    }
    res.render("auth/login");
}

// Logout user
module.exports.logout = (req, res, next) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/books");
}

// Register new user
module.exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        const newUser = await User.register(user, password);
        req.login(newUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome to BookApp, ${username}!`);
            res.redirect("/books");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/auth/register");
    }
}

// Login existing user
module.exports.login = (req, res) => {
    const { username } = req.body;
    req.flash("success", `Welcome back ${username}!`);
    const redirectUrl = req.session.returnTo || "/books";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}