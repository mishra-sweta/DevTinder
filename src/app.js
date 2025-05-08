const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middleware/auth");

app.use("/admin", adminAuth); //Middleware for all admin path
app.get("/user/login", (req, res) => {
  res.send("Login done successfully");
});

//middleware used when required
app.get("/user/getUserData", userAuth, (req, res) => {
  res.send("User Data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent to admin");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User deleted");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});
