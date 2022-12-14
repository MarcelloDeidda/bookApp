const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
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
    ]
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);