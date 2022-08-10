const express = require('express');
const { addBook, searchBook, addBookToBookList } = require('../handlers/book');
const bookRouter = express.Router();

bookRouter.post('/addBook', addBook);
bookRouter.get('/searchBook', searchBook);  //baseurl/searchBook?title=
bookRouter.post('/addBookToBookList/:bookId', addBookToBookList);

module.exports = {bookRouter};