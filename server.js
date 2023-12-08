const express = require("express");
const app = express();
const cors = require("cors");
// -------------------require in database that you create
require("./src/db/db.js");

// ----------------------listen on port-----------
app.listen(9000, () => {
  console.log("Server started.....");
});
// ---------------------Midealware to communicate database -------
app.use(express.json());
app.use(cors());

// ---------------that file import to create User.js------------
const User = require("./src/db/User");

app.post("/register", async (req, res) => {
  // -----------------EmailExist is already exits email code..............
  const EmailExist = await User.findOne({ email: req.body.email });
  if (EmailExist) {
    res.json("Email already exists");
  } else {
    if (req.body.email && req.body.passWord && req.body.name) {
      let user = await new User(req.body);
      let result = await user.save();
      res.json({
        status: true,
        user: result,
      });
    } else {
      res.json({
        status: false,
        messsage: "Field is required",
      });
    }
  }
});

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body).select("-passWord");
  if (req.body.email && req.body.passWord && user != null) {
    res.json({
      status: true,
      messsage: " successfully login",
      user: user,
    });
  } else if (!req.body.passWord) {
    res.json({
      status: false,
      message: "Password Not Entered",
    });
  } else {
    res.json({
      status: false,
      message: "user not found",
    });
  }
});
