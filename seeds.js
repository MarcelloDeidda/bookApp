const mongoose = require("mongoose");
const Book = require("./models/book");

// Set up dataase connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/bookApp');
    console.lof("CONNECTED TO MONGOOSE");
}

// Seeds
const seedBooks = [
    {
        title: "Some Prefer Nettles",
        author: "Junichiro Tanizaki",
        year: 1928,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1543581429l/17795685._SY475_.jpg"
    },
    {
        title: "Jane Eyre",
        author: "Charlotte Bronte",
        year: 1847,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546419325l/12913540._SY475_.jpg"
    },
    {
        title: "4 3 2 1",
        author: "Paul Auster",
        year: 2017,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1484890490l/32192913._SY475_.jpg"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546419288l/15994711._SY475_.jpg"
    },
    {
        title: "Anything is Possible",
        author: "Elizabeth Strout",
        year: 2017,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1528114611l/36200477._SY475_.jpg"
    },
    {
        title: "Why I'm No Longer Talking to White People About Race",
        author: "Reni Eddo-Lodge",
        year: 2017,
        imgUrl: "https://images-na.ssl-images-amazon.com/images/I/61kVpYzIBXL.jpg"
    },
    {
        title: "The Brooklyn Follies",
        author: "Paul Auster",
        year: 2005,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348277290l/841966.jpg"
    },
    {
        title: "Pachinko",
        author: "Lee Min-jin",
        year: 2017,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1530862463l/40730474._SY475_.jpg"
    }
]

// Populate database
Book.insertMany(seedBooks)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })