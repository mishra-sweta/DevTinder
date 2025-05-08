const express = require("express");

const app = express();

const { connectDB } = require("./config/database");

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Ankita",
    lastName: "Mishra",
    emailId: "ankita.mishra@gmail.com",
    password: "ankita@123",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("failed to signup user");
  }
});

connectDB()
  .then(() => {
    console.log("Connected to the database...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on PORT 3000");
    });
  })
  .catch((err) => {
    console.log("Couldn't connect to database");
  });
