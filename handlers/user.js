const jwt = require("jsonwebtoken");
const { User } = require("../database/user");

const secret = process.env.SECRET;

// create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "User already exists",
      });
    } else {
      console.log("password");
      let newPassword = jwt.sign(password, secret);

      const newUser = await User.create({ name, email, password: newPassword });
      // console.log(newUser)
      let response = newUser.toJSON();
      delete response.password;
      return res.status(201).send(response);
    }
  } catch (error) {
    return res.status(500).send({ message: error || "Internal Server Error" });
  }
};

// login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("password");
    if (!user) {
      return res.status(400).send({
        message: "User does not exist",
      });
    } else {
      const decode = jwt.decode(user.password, secret);
      if (decode === password) {
        let token = jwt.sign({ _id: user._id }, secret);
        return res.status(200).send({ token: token });
      } else {
        return res.status(400).send({ message: "Invalid password" });
      }
    }
  } catch (error) {
    return res.status(500).send({ message: error || "Internal Server Error" });
  }
};

// get user
const getUser = async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error || "Internal Server Error" });
  }
};

// get book list
const getBookList = async (req, res) => {
  try {
    const { name } = req.query;
    const user = await User.findOne({ name }).populate("books");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ bookList: user.books });
  } catch (error) {
    return res.status(500).send({ message: error || "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  getBookList,
};
