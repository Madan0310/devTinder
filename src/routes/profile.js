const express = require("express");
const { userAuth } = require("../middilewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    // below code is not required now because we have added authentication middlware, we handled it over there
    /* const cookie = req.cookies;
    console.log("cookie", cookie);
    const { token } = cookie;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$0310");
    console.log(decodedMessage);
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    console.log(user); */
    const user = req.user;
    res.send(user);
  } catch (e) {
    res.status(400).send("Error:: " + e.message);
  }
});

module.exports = profileRouter;
