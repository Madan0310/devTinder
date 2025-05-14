const adminAuth = (req, res, next) => {
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
};

module.exports = {
  adminAuth,
  userAuth,
};
