const express = require("express");

const { adminAuth, userAuth } = require("./middilewares/auth");

const app = express();

// Handle Auth Middleware for all request GET, POST, PUT etc..
app.use("/admin", adminAuth);
// app.use("/user", userAuth);

app.get("/admin/getAllData", (req, res, next) => {
  res.send("Admin data sent successfully!!");
});

app.get("/admin/getActiveData", (req, res, next) => {
  res.send("Active Admin data sent successfully!!");
});

app.get("/user/login", (req, res, next) => {
  res.send("User logged in successfully!!");
});

app.get("/user/getUserData", userAuth, (req, res, next) => {
  res.send("User data sent successfully!!");
});

// Routing and Request Handlers

// app.get("/user", rh1, rh2, rh3, rh4, rh5);
// app.get("/user", [rh1, rh2, rh3, rh4, rh5]);
/* app.use(
  "/user",
  userAuth,
  (req, res, next) => {
    console.log("Handling the route user 1");
    // res.send("Handling the first route");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2");
    // res.send("Handling the second route");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 3");
    res.send("Handling the third route");
    // next();
  }
); */

// Example for query parameters and dynamic routing

/* app.get("/user", (req, res) => {
  const { userid, password } = req.query;
  console.log(req.query);
  res.send({ userId: userid, password: password });
}); */

/* app.get("/user/:userid/:password", (req, res) => {
  const { userid, password } = req.params;
  console.log(req.params);
  res.send({ userId: userid, password: password });
}); */

// Examples for HTTP methods

/* app.get("/user", (req, res) => {
  res.send({ firstName: "Madanmohan", lastName: "Komatireddy" });
});

app.post("/user", (req, res) => {
  res.send("Data successfully saved to the database!!");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted successfully!!");
}); */

// app.use("/test", (req, res) => {
//   res.send("Hello from test page");
// });

// app.use("/hello", (req, res) => {
//   res.send("Hello hello hello");
// });

// app.use("/", (req, res) => {
//   res.send("This is dashboard");
// });

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
