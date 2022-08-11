require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const { userRouter } = require("./routes/user");
const { bookRouter } = require("./routes/book");
const { connectDB } = require("./database/index");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use(userRouter);
app.use(bookRouter);

app.get('/', (req,res) => {
  res.send('Welcome to the Book Store')
})

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
