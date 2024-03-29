# === BookApp === 

[Give it a try!](https://marcellodeidda-bookapp.cyclic.app/)


## <a name="the-project"></a>1.The project


BookApp is an online platform for book lovers and readers. It allows users to discover new books, rate and review books they've read and create personalized bookshelves.

This webapp holds a database of books and any user can contribute by uploading info about books which haven't been added yet. The app also provides some recommendations based on the user's favourite books.

The aim of this project is to create a simple social media platform where users can follow each other and take inspiration from each other's libraries, as well as recommend books to friends.


## <a name="development"></a>2.Development


// This app (as well as this README) is still in progress as of today.

BookApp is developed with a Node.js runtime environment. The data is stored in a MongoDB database, connected to Node.js via Mongoose and hosted by MongoDB Atlas. The server is managed with Express.js.

The dinamic views are written with EJS templating language. The frontend design mainly relies on Bootstrap v5.2, in addition to some CSS custom styles.

Register and Login functionalities, as well as safe password handling are managed by Passport. Custom middleware controls basic authorisation. Some additional security is provided with express-mongo-sanitize and sanitize-html. Other NPM packages used are express-session, connect-flash, JOI.

The webapp is deployed via Render and is fully responsive for any screen type. When the server is not being used, it can take a few seconds for it to start.


### <a name="models"></a>2.1.Models


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


### <a name="routes-and-controller"></a>2.2.Routes and Controllers


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


### <a name="utils"></a>2.3.Utils


The "utils" folder contains some helper files:

- "catchAsync.js" contains a middleware that catches and handles async errors
- "ExpressError.js" contains a custom Error class that sends an error message and a status code
- "schemas.js" contains JOI validation schemas for books and reviews
- "middleware.js" contains authorization and validation functions
- "similarity.js" contains a function that compares favourite books with unread books and returns a list of recommended books
- "categories.js" contains a list of book categories that are used as enum for the Book model


## <a name="usage"></a>3.Usage


This webpage provides a database of books. Unlogged users can browse book information, via the "Explore" pages. Logged users can add new books, review existing books, create personal libraries, visit other users' pages.


### <a name="portal"></a>3.1.Portal


The portal provides a few links to navigate the webapp.

**Unlogged user** will see links to Login, Register, as well as Explore pages.

**Logged user** will see links to Explore and Library pages.


### <a name="auth"></a>3.2.Authentication


The **Register** page will ask to enter a Username and a Password (to be confirmed). Usernames are unique. Password are safely handled by the backend, although it is recommended to use a unique password. At the moment, users cannot change or recover the password. The user will be automatically logged in after registration, and will be remembered by the browser for seven days.

The **Login** page will ask to input Username and Password. If successful, the user will be redirected to the previous page, or to the Explore page.


### <a name="nav"></a>3.3.Navbar


The Navbar contains two dropdown menus: Books and User.

The **Book** menu shows links to: Explore Books, Explore Authors, Explore Categories, and Add New Book (the latter only available for logged users).

The **User** menu will show links to Login and Register pages to an unlogged user. If the user is logged, it will display the Username and will show links to Library and Logout.


### <a name="explore"></a>3.4.Explore


The **Explore** page shows the complete list of books saved in the database. Books are displayed through their cover only, which contains a link to the book page. The book list is displayed in random order, but they can also be ordered by title, year of publishing, and (soon) rating. The user can also search by title or author name.

The **Explore Authors** page will render a list of the saved authors. By clicking a name, the user will be able to see all books written by that author. These books can be ordered as in the Explore page.

The **Explore Categories** page will render a list of the saved categories. By clicking a category, the user will be able to see all books saved under that category. These books can be ordered as in the Explore page.


### <a name="show"></a>3.5.Show


The Show page will display **book information**: Title, Author, Category, Summary, Cover. It will also show a **Reviews** box, with a list of the reviews added for that book. Each review contains username, rating in stars (1 to 5) and text. It can be deleted by the review author, or by an admin.

A **logged user** will be able to add the book to their own libraries. Every book can be added to the **Wishlist** (exclusively), or to the **Read Books** and **Favourite Books**. If a book is added to Favourite Books, it is also automatically added to Read Books. If a book is removed from Read Books, it will be removed from Favourite Books too. A book must be removed from the Wishlist to be added to Read/Favourite Books, and vice versa.

The user who added the book to the database will also be able to **Edit** or **Delete** it. These funcionalities are also available to admins.


### <a name="new-edit"></a>3.6.New/Edit Book


The New Book and the Edit Book page are similar in content. They both are accessible only by logged users. They display a form with the following inputs:

- "Title" as text input;

- "Author" as text input;

- "Year of publication" as number input;

- "Category" as select from list - one or more elements must be selected;

- "Summary" as textarea;

- "Image URL" as text input;


### <a name="library"></a>3.7.Library


The Library page will show the personal libraries: **Read Books**, **Favourite Books**, **Wishlist** and **Recommended Books**.

The Recommended Books list contains 10 books, and is based on the Favourite Books list, which must contain at least five books for this functionality to work.

Each of these lists shows a preview of five books, and contains a link to the full list.


### <a name="coming-soon"></a>3.8.Coming Soon


This app is still under development. While all of the features listed above are currently working, there is still some work to do to allow user interactions, such as visit and follow other users' libraries and send book recommendations.

Future development plans include a User Dashboard, and improved accessibility.


## <a name="previews"></a>4.Previews


### <a name="explore-preview"></a>4.1.Explore Category Page


![explore](https://user-images.githubusercontent.com/76016486/215789734-ab046c9e-b83e-4955-af94-d8467758776b.png)


### <a name="show-preview"></a>4.2.Show Page


![show](https://user-images.githubusercontent.com/76016486/215789793-2e886ee0-a46a-43fc-a721-67fa5ca68036.png)


### <a name="edit-preview"></a>4.3.Edit page


![edit-book](https://user-images.githubusercontent.com/76016486/215789847-0c39f42e-111b-4396-b4e3-c75721495a9a.png)


### <a name="library-preview"></a>4.4.Library Page


![library](https://user-images.githubusercontent.com/76016486/215789875-d8c42ede-4b50-492c-b0ed-6abdd892422e.png)
