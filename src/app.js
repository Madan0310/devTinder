const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

// const { adminAuth, userAuth } = require("./middilewares/auth");

const app = express();

app.use(express.json());

// DATABASE, SCHEMA & MODELS | MONGOOSE
// DIVING INTO THE APIs
// DATA SANITIZATION & SCHEMA VALIDATIONS
// ENCRYPTING PASSWORD

// Create user into the database
app.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);

    // password encryption
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

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
    // console.log("New error:: ", e);
    res.status(400).send("Error:: " + e.message);
  }
});

//login user
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials"); // throw new Error("Email Id is not present in the Database");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      res.send("User logged In Successfully!!");
    } else {
      throw new Error("Invalid Credentials"); // throw new Error("Password is not correct!");
    }
  } catch (e) {
    res.status(400).send("Error:: " + e.message);
  }
});
// Get User by emaail
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail);
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
});

//Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
});

//Delete user with id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const response = await User.findByIdAndDelete(userId); //User.findByIdAndDelete({_id: userId})
    console.log(response);
    if (response !== null) {
      res.send("User deleted Successfully");
    } else {
      res.send("User not found to delete");
    }
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
});

// Update data of the user
app.patch("/user/:userid", async (req, res) => {
  const userId = req.params.userid;
  try {
    const ALLOWED_UPDATES = [
      "photoURL",
      "about",
      "password",
      "skills",
      "firstName",
      "lastName",
    ];
    const isAllowed = Object.keys(req.body).every((item) =>
      ALLOWED_UPDATES.includes(item)
    );
    if (!isAllowed) {
      throw new Error("Update is not allowed");
    }
    const response = await User.findByIdAndUpdate(userId, req.body, {
      runValidators: true,
    });
    console.log(response);
    res.send("User updated successfully!!");
  } catch (e) {
    res.status(400).send("User Update: " + e.message);
  }
});

// EXAMPLES FOR HTTP METHODS

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

// ROUTING AND REQUEST HANDLERS

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

// EXAMPLE FOR QUERY PARAMETERS AND DYNAMIC ROUTING

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

// Handle Auth Middleware for all request GET, POST, PUT etc.. - MIDDLEWARES

/* app.use("/admin", adminAuth);
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
}); */

// ERROR HANDLERS

/* app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/getUserData", (req, res, next) => {
  // connect to DB to get the data
  try {
    throw new Error("Unknow error");
    res.send("User data sent successfully!!");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
}); */

connectDB()
  .then(() => {
    console.log("Database connection established!!");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });
