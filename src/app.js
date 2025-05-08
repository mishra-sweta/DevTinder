const express = require("express");

const app = express();

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
  (req, res, next) => {
    console.log("Response 3");
    next();
  }
);

app.get("/user", (req, res) => {
  console.log("Response 4");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});
