const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    readBooks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book"
        }
    ],
    favouriteBooks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book"
        }
    ],
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book"
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);