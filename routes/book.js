const express = require("express");
const {
  addBook,
  searchBook,
  addBookToBookList,
  deleteBook,
  getAllBooks,
} = require("../handlers/book");
const bookRouter = express.Router();

bookRouter.post("/addBook", addBook);
bookRouter.get("/searchBook", searchBook); //baseurl/searchBook?title=
bookRouter.post("/addBookToBookList/:bookId", addBookToBookList);
bookRouter.delete("/deleteBook/:bookId", deleteBook);
bookRouter.get("/getAllBooks", getAllBooks);

module.exports = { bookRouter };
