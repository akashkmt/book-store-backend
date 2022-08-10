const { Book } = require("../database/book");
const { User } = require("../database/user");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
// add a book
const addBook = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (title && description) {
      let check = await Book.findOne({ title });
      if (check) {
        return res.status(400).json({
          message: "Book already exists",
        });
      } else {
        const newBook = await Book.create({ title, description });
        return res
          .status(201)
          .send({ message: "Book added successfully", book: newBook });
      }
    } else {
      return res
        .status(400)
        .send({ message: "Please provide title and description" });
    }
  } catch (error) {
    return res.status(500).send({ message: error || "Internal Server Error" });
  }
};

const searchBook = async (req, res) => {
  try {
    const { title } = req.query;
    if (title) {
      const book = await Book.find({ title: { $regex: title } });
      if (book) {
        return res.status(200).send({ book: book });
      } else {
        return res.status(400).send({ message: "Book not found" });
      }
    } else {
      return res.status(400).send({ message: "Please provide title" });
    }
  } catch (error) {
    return res.status(500).send({ message: error || "Internal Server Error" });
  }
};

const addBookToBookList = async (req, res) => {
  try {
    const { token } = req.headers;
    const { bookId } = req.params;
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.decode(token, secret);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    } else {
      let check = user.books.includes(bookId);
      if (check) {
        return res
          .status(400)
          .send({ message: "Book already added to book list" });
      } else {
        let books = user.books;
        books.push(bookId);
        await User.findOneAndUpdate({ _id: decoded._id }, { books });
        return res.status(200).send({ message: "Book added to book list" });
      }
    }
  } catch (error) {
    return res.status(500).send({ message: error || "Internal Server Error" });
  }
};

// delete a book
const deleteBook = async (req, res) => {
  // console.log('called')
  try {
    const { bookId } = req.params;
    const { token } = req.headers;
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.decode(token, secret);
    const user = await User.findOne({ _id: decoded._id });
    const check = user.books.includes(bookId);
    if (!check) {
      return res.status(400).send({ message: "Book not found" });
    } else {
      let books = user.books;
      books.splice(books.indexOf(bookId), 1);
      await User.findOneAndUpdate({ _id: decoded._id }, { books });
      return res.status(200).send({ message: "Book deleted successfully" });
    }
  } catch (error) {
    return res.status(500).send({ message: error || "Internal Server Error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).send({ books: books });
  } catch (error) {
    return res.status(500).send({ message: error || "Internal Server Error" });
  }
};

module.exports = {
  addBook,
  searchBook,
  addBookToBookList,
  deleteBook,
  getAllBooks,
};
