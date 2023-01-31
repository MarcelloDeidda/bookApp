const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const User = require("./user");
const categories = require("../utils/categories");

const bookSchema = new Schema({
    title: String,
    author: String,
    year: Number,
    summary: String,
    imgUrl: String,
    category: {
        type: [String],
        enum: categories,
        default: "None"
    },
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

bookSchema.virtual("rating").get(function () {
    if (this.reviews.length === 0) {
        return undefined;
    } else {
        let ratingTotal = 0;
        for (let review of this.reviews) {
            ratingTotal += review.rating
        }
        return Math.round(ratingTotal / this.reviews.length);
    }
})

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