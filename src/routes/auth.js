const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);

    // password encryption
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const userData = await User.findOne({ emailId: emailId });

    if (userData) {
      throw new Error("This user already exist");
    }

    //Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User created successfully");
  } catch (e) {
    res.status(400).send("Error:: " + e.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials"); // throw new Error("Email Id is not present in the Database");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // Create a JWT token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$0310", {
        expiresIn: "7d",
      });
      console.log(token);

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("User logged In Successfully!!");
    } else {
      throw new Error("Invalid Credentials"); // throw new Error("Password is not correct!");
    }
  } catch (e) {
    res.status(400).send("Error:: " + e.message);
  }
});

module.exports = authRouter;
