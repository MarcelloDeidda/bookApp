const mongoose = require("mongoose");
const Book = require("./models/book");

// Set up dataase connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/bookAppDatabase');
    console.log("CONNECTED TO MONGOOSE");
}

// Seeds
const seedBooks = [
    {
        title: "Some Prefer Nettles",
        author: "Junichiro Tanizaki",
        summary: "The marriage of Kaname and Misako is disintegrating: whilst seeking passion and fulfilment in the arms of others, they contemplate the humiliation of divorce. Misako's father believes their relationship has been damaged by the influence of a new and alien culture, and so attempts to heal the breach by educating his son-in-law in the time-honoured Japanese traditions of aesthetic and sensual pleasure. The result is an absorbing, chilling conflict between ancient and modern, young and old.",
        year: 1928,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1543581429l/17795685._SY475_.jpg"
    },
    {
        title: "Jane Eyre",
        author: "Charlotte Bronte",
        summary: "Orphaned as a child, Jane has felt an outcast her whole young life. Her courage is tested once again when she arrives at Thornfield Hall, where she has been hired by the brooding, proud Edward Rochester to care for his ward Adèle. Jane finds herself drawn to his troubled yet kind spirit. She falls in love. Hard. But there is a terrifying secret inside the gloomy, forbidding Thornfield Hall. Is Rochester hiding from Jane? Will Jane be left heartbroken and exiled once again?",
        year: 1847,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546419325l/12913540._SY475_.jpg"
    },
    {
        title: "4 3 2 1",
        author: "Paul Auster",
        summary: "Nearly two weeks early, on March 3, 1947, in the maternity ward of Beth Israel Hospital in Newark, New Jersey, Archibald Isaac Ferguson, the one and only child of Rose and Stanley Ferguson, is born. From that single beginning, Ferguson’s life will take four simultaneous and independent fictional paths. Four identical Fergusons made of the same DNA, four boys who are the same boy, go on to lead four parallel and entirely different lives. Family fortunes diverge. Athletic skills and sex lives and friendships and intellectual passions contrast. Each Ferguson falls under the spell of the magnificent Amy Schneiderman, yet each Amy and each Ferguson have a relationship like no other. Meanwhile, readers will take in each Ferguson’s pleasures and ache from each Ferguson’s pains, as the mortal plot of each Ferguson’s life rushes on. As inventive and dexterously constructed as anything Paul Auster has ever written, yet with a passion for realism and a great tenderness and fierce attachment to history and to life itself that readers have never seen from Auster before. 4 3 2 1 is a marvelous and unforgettably affecting tour de force.",
        year: 2017,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1484890490l/32192913._SY475_.jpg"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        summary: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work \"her own darling child\" and its vivacious heroine, Elizabeth Bennet, \"as delightful a creature as ever appeared in print.\" The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring. And Jane Austen\'s radiant wit sparkles as her characters dance a delicate quadrille of flirtation and intrigue, making this book the most superb comedy of manners of Regency England.",
        year: 1813,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546419288l/15994711._SY475_.jpg"
    },
    {
        title: "Anything is Possible",
        author: "Elizabeth Strout",
        summary: "Short story collection Anything Is Possible explores the whole range of human emotion through the intimate dramas of people struggling to understand themselves and others. Here are two sisters: one trades self-respect for a wealthy husband while the other finds in the pages of a book a kindred spirit who changes her life. The janitor at the local school has his faith tested in an encounter with an isolated man he has come to help; a grown daughter longs for mother love even as she comes to accept her mother’s happiness in a foreign country; and the adult Lucy Barton (the heroine of My Name Is Lucy Barton) returns to visit her siblings after seventeen years of absence.",
        year: 2017,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1528114611l/36200477._SY475_.jpg"
    },
    {
        title: "Why I'm No Longer Talking to White People About Race",
        author: "Reni Eddo-Lodge",
        summary: "In 2014, award-winning journalist Reni Eddo-Lodge wrote about her frustration with the way that discussions of race and racism in Britain were being led by those who weren't affected by it. She posted a piece on her blog, entitled: 'Why I'm No Longer Talking to White People About Race' that led to this book. Exploring issues from eradicated black history to the political purpose of white dominance, whitewashed feminism to the inextricable link between class and race, Reni Eddo-Lodge offers a timely and essential new framework for how to see, acknowledge and counter racism. It is a searing, illuminating, absolutely necessary exploration of what it is to be a person of colour in Britain today.",
        year: 2017,
        imgUrl: "https://images-na.ssl-images-amazon.com/images/I/61kVpYzIBXL.jpg"
    },
    {
        title: "The Brooklyn Follies",
        author: "Paul Auster",
        summary: "Nathan Glass has come to Brooklyn to die. Divorced, retired, estranged from his only daughter, the former life insurance salesman seeks only solitude and anonymity. Then Glass encounters his long-lost nephew, Tom Wood, who is working in a local bookstore—a far cry from the brilliant academic career Tom had begun when Nathan saw him last. Tom's boss is the colorful and charismatic Harry Brightman—a.k.a. Harry Dunkel—once the owner of a Chicago art gallery, whom fate has also brought to the \"ancient kingdom of Brooklyn, New York.\" Through Tom and Harry, Nathan's world gradually broadens to include a new circle of acquaintances. He soon finds himself drawn into a scam involving a forged page of The Scarlet Letter, and begins to undertake his own literary venture, The Book of Human Folly, an account of \"every blunder, every pratfall, every embarrassment, every idiocy, every foible, and every inane act I have committed during my long and checkered career as a man.\"",
        year: 2005,
        imgUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348277290l/841966.jpg"
    },
    {
        title: "Pachinko",
        author: "Lee Min-jin",
        summary: "In the early 1900s, teenaged Sunja, the adored daughter of a crippled fisherman, falls for a wealthy stranger at the seashore near her home in Korea. He promises her the world, but when she discovers she is pregnant — and that her lover is married — she refuses to be bought. Instead, she accepts an offer of marriage from a gentle, sickly minister passing through on his way to Japan. But her decision to abandon her home, and to reject her son's powerful father, sets off a dramatic saga that will echo down through the generations. Richly told and profoundly moving, Pachinko is a story of love, sacrifice, ambition, and loyalty. From bustling street markets to the halls of Japan's finest universities to the pachinko parlors of the criminal underworld, Lee's complex and passionate characters — strong, stubborn women, devoted sisters and sons, fathers shaken by moral crisis — survive and thrive against the indifferent arc of history.",
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