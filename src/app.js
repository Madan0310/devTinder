const express = require("express");

const app = express();

// Example for query parameters and dynamic routing

/* app.get("/user", (req, res) => {
  const { userid, password } = req.query;
  console.log(req.query);
  res.send({ userId: userid, password: password });
}); */

app.get("/user/:userid/:password", (req, res) => {
  const { userid, password } = req.params;
  console.log(req.params);
  res.send({ userId: userid, password: password });
});

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
