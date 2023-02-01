const User = require("../models/user");
const Book = require("../models/book");

module.exports.showLibrary = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username })
        .populate("readBooks")
        .populate("favouriteBooks")
        .populate("wishlist");
    res.render("community/library", { user });
}

module.exports.showRead = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username })
        .populate("readBooks")
    const bookList = user.readBooks;
    res.render("community/list", { username, bookList, role: "Read Books" })
}

module.exports.showFavourite = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username })
        .populate("favouriteBooks");
    const bookList = user.favouriteBooks;
    res.render("community/list", { username, bookList, role: "Favourite Books" })
}

module.exports.showWishlist = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username })
        .populate("wishlist");
    const bookList = user.wishlist;
    res.render("community/list", { username, bookList, role: "Wishlist" })
}

module.exports.follow = async (req, res) => {
    const currentUser = req.user;
    const { username } = req.params;
    const followedUser = await User.findOne({ username });
    if (currentUser.following.indexOf(followedUser.id) === -1) {
        currentUser.following.push(followedUser);
        await currentUser.save();
        followedUser.followers.push(currentUser);
        await followedUser.save();
        req.flash("success", `You are now following ${username}!`)
        res.redirect(`/community/${username}`);
    } else {
        req.flash("error", `You are already following ${username}!`)
        res.redirect(`/community/${username}`);
    }
}

module.exports.unfollow = async (req, res) => {
    const currentUser = req.user;
    const { username } = req.params;
    const followedUser = await User.findOne({ username });
    if (currentUser.following.indexOf(followedUser.id) > -1) {
        currentUser.following.remove(followedUser);
        await currentUser.save();
        followedUser.followers.remove(currentUser);
        await followedUser.save();
        req.flash("success", `You have unfollowed ${username}!`)
        res.redirect(`/community/${username}`);
    } else {
        req.flash("error", `You are not following ${username}!`)
        res.redirect(`/community/${username}`);
    }
}