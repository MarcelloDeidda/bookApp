const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Reviews = require("./models/review");


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/bookApp")
    console.log("CONNECTED TO MONGOOSE");
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})