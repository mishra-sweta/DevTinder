const express = require("express");

const app = express();

//GET /user - Middleware chain -> res handler

//Middleware
app.use("/user", (req, res, next) => {
  console.log("Middleware");
  next();
});

app.get(
  "/user",
  (req, res, next) => {
    console.log("Response 1");
    next();
  },
  (req, res, next) => {
    console.log("Response 2");
    res.send("Response!!!!!!!!");
    next();
  },
  (req, res) => {
    console.log("Response 3");
  }
);

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});
