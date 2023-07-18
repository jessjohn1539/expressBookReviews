const express = require('express');
const books = require("./booksdb.js");
const { isValid } = require("./auth_users.js");
let users = require("./auth_users.js").users;


const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if the username already exists
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Create a new user object and add it to the users array
  const newUser = { username, password };
  users.push(newUser);

  return res.status(200).json({ message: "Registration successful" });
});

public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json({ book });
});

public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = Object.values(books).filter((book) => book.author === author);

  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "No books found by this author" });
  }

  return res.status(200).json({ books: booksByAuthor });
});

public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const booksWithTitle = Object.values(books).filter((book) => book.title === title);

  if (booksWithTitle.length === 0) {
    return res.status(404).json({ message: "No books found with this title" });
  }

  return res.status(200).json({ books: booksWithTitle });
});

public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!book.reviews || book.reviews.length === 0) {
    return res.status(404).json({ message: "No reviews found for this book" });
  }

  return res.status(200).json({ reviews: book.reviews });
});

module.exports.general = public_users;
