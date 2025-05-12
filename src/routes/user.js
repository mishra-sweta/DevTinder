const express = require("express");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const pendingRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "gender"]);

    if (pendingRequests.length === 0) {
      res.status(400).send("No pending requests");
    }
    res.json({
      message: "These are the pending requests",
      data: pendingRequests,
    });
  } catch (error) {
    res.status(400).send("Error: ", error.message);
  }
});

userRouter.get("user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    });

    res.json({ messages: "My connections", data: connections });
  } catch (error) {
    res.status(400).send("Error : ", error.message);
  }
});

module.exports = userRouter;
