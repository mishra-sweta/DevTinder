const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.post("/test", (req, res) => {
  res.send("Hello from test!");
});

app.get("/hello", (req, res) => {
  res.send("Hello hello hello");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});
