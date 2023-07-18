const express = require('express');
const jwt = require('jsonwebtoken');
const books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  // Check if the username is valid
  // Write code to perform any desired validation logic
  // Return true or false based on the validation result
};

const authenticatedUser = (username, password) => {
  // Check if the username and password match the ones in the records
  // Write code to perform the desired authentication logic
  // Return true or false based on the authentication result
};

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username" });
  }

  if (authenticatedUser(username, password)) {
    const token = jwt.sign({ username }, "your_secret_key");

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Authentication failed" });
  }
});

regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;

  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.reviews.push(review);

  return res.status(200).json({ message: "Review added successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
