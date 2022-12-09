const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const User = require("./user");

const bookSchema = new Schema({
    title: String,
    author: String,
    year: Number,
    summary: String,
    imgUrl: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

bookSchema.post("findOneAndDelete", async (doc) => {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;