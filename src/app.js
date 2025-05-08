const express = require("express");

const app = express();

const { connectDB } = require("./config/database");

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("failed to signup user");
  }
});

app.get("/userByEmail", async (req, res) => {
  const user = await User.findOne({ emailId: req.body.emailId });

  try {
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  const users = await User.find({});

  try {
    if (users.length === 0) {
      res.status(404).send("No users");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
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
