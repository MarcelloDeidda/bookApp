# === BookApp - IN PROGRESS ===

1. Project

2. Development

3. Contents

4. Installation

5. Previews

## 1.The project:


BookApp is an online platform for book lovers an readers. It allows users to discover new books, rate and review books they've read and create personalized bookshelves.

This webapp holds a database of books and any user can contribute by uploading info about books which haven't been added yet. The app also provides some recommendations based on the user's favourite books.

The aim of this project is to create a simple social media platform where users can follow each other and take inspiration from each other's libraries, as well as recommend books to friends.


## 2.Development:


// This app (as well as this README) is still in progress as of today.

BookApp is developed with a Node.js runtime environment. The data is stored in a MongoDB database, connected to Node.js via Mongoose and hosted by MongoDB Atlas. The server is managed with Express.js.

The dinamic views are written with EJS templating language. The frontend dasign mainly relies on Bootstrap v5.2, in addition to some CSS custom styles.

Register and Login functionalities, as well as safe password handling are managed by Passport. Custom middleware controls basic authorisation. Some additional security is provided with express-mongo-sanitize and sanitize-html. Other NPM packages used are express-session, connect-flash, JOI.


### 2.1.Models


The database is articulated in three models: Book, Review and User.

The Book model consists of:
- title (String)
- author (String)
- year (Number)
- summary (String)
- imgUrl (String)
- category (Array of enums)
- reviews (Array of Reviews)
- createdBy (User)

The Review model consists of:
- body (String)
- rating (Number)
- author (User)

The User model consists of:
- readBooks (Array of Books)
- favouriteBooks (Array of Books)
- wishlist (Array of Books)

Username and Password are managed by Passport, and therefore are not part of the User model.


### 2.2.Routes and Controllers


The are five different routers with corresponding controllers: books, reviews, auth, user, community.

The books router manages the following actions:
- Show the Explore section, containing all books in the database
- Search books or authors by keyword
- Browse all authors
- Show all books written by a given author
- Book CRUD operations: create, read, update, delete a book.
- Add or remove book to/from personal library (read, favourite, wishlist)

The reviews router manages the following actions:
- Add or remove a book review

The auth router manages the following actions:
- Register with username and password
- Login and logout

The user router manages the following actions:
- Show one's personal libraries
- Browse read, favourite and wishlist books
- Show recommended books based on favourite books

The community router manages the following actions:
- Show a different user's library
- Browse a different user's read, favourite and wishlist books


### 2.3.Utils


The "utils" folder contains some helper files:

- "catchAsync.js" contains a middleware that catches and handles async errors
- "ExpressError.js" contains a custom Error class that sends an error message and a status code
- "schemas.js" contains JOI validation schemas for books and reviews
- "middleware.js" contains authorization and validation functions
- "similarity.js" contains a function that compares favourite books with unread books and returns a list of recommended books
- "categories.js" contains a list of book categories that are used as enum for the Book model

## 3.Contents:

- models/ - Contains book.js and review.js mongoose models

- node_modules/ - Contains npm files

- public/ - Contains .css and .js static files

- utils/ - Contains utils.js, with helper functions

- views/ - Contains .ejs templates

- index.js - Contains the main app, with the server setup

- package.json / package-lock.js - Contains npm project info

- seeds.js - Populates database


## 4.Installation:


## 5.Previews:
- Index page:
![index](https://user-images.githubusercontent.com/76016486/204314176-bf7c85b3-f7a0-4663-aafa-f3f5b05b8831.png)

- Show page:
![show](https://user-images.githubusercontent.com/76016486/204314296-8da25143-ad72-44c4-a2f5-6c166b7b7e99.png)

- Edit page:
![edit](https://user-images.githubusercontent.com/76016486/204314331-4e5ad373-a721-42ed-9557-564a32c646bf.png)
