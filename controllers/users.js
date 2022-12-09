const User = require("../models/user");

// Render register form
module.exports.renderRegister = (req, res) => {
    res.render("users/register");
}

// Render login form
module.exports.renderLogin = (req, res) => {
    res.render("users/login");
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
}

// Login existing user
module.exports.login = (req, res) => {
    const { username } = req.body;
    req.flash("success", `Welcome back ${username}!`);
    const redirectUrl = req.session.returnTo || "/books";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}