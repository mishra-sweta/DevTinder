const express = require("express");

const app = express();

//always use try-catch if not the app.use error handler will handle it
// app.get("/user", (req, res) => {
//   try {
//     throw new Error();
//     res.send("Something with the user");
//   } catch (error) {
//     res.status(500).send("Something went wrong");
//   }
// });

app.get("/user", (req, res) => {
  throw new Error();
  res.send("Something with the user");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something really  went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});
