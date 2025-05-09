const express = require("express");

const app = express();

const { connectDB } = require("./config/database");

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    if (!req.body.emailId || !req.body.password) {
      return res.status(400).send("Missing required fields");
    }
    const user = new User(req.body);
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Failed to signup user : " + error.message);
  }
});

app.get("/userByEmail", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
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
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;
    const ALLOWED_FIELDS = [
      "userId",
      "photoURL",
      "about",
      "age",
      "gender",
      "skills",
    ];
    const isAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );
    if (!isAllowed) {
      throw new Error("Update not allowed");
    }
    await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
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
