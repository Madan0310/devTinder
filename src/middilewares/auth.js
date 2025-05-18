const jwt = require("jsonwebtoken");
const User = require("../models/user");

/* const adminAuth = (req, res, next) => {
  const token = "abcd";
  const isAuthenticated = token === "abcd";
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized access");
  } else {
    console.log("Admin authenticated Successfully");
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "abcd";
  const isAuthenticated = token === "abcd";
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized access");
  } else {
    console.log("User authenticated Successfully");
    next();
  }
}; */

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token!!!");
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$0310");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error:: " + err.message);
  }
};

module.exports = {
  //   adminAuth,
  userAuth,
};
