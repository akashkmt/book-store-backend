const express = require('express');
const { createUser, loginUser, getUser, getBookList } = require('../handlers/user');
const userRouter = express.Router();

userRouter.post('/createUser', createUser);
userRouter.post('/loginUser', loginUser);
userRouter.get('/getUser', getUser);
userRouter.get('/getBookList', getBookList);  //baseurl/getBookList?name=

module.exports = {userRouter};