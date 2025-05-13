const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const pendingRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "gender",
      "skills",
    ]);

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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "skills",
      ])
      .populate("toUserId", "firstName lastName photoUrl gender skills")
      .lean();

    const data = connections.map((conn) => {
      if (conn.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return conn.toUserId;
      }

      return conn.fromUserId;
    });

    res.json({ messages: "My connections", data: data });
  } catch (error) {
    res.status(400).send("Error : ", error.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    //find all connection req I have sent or reject
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((conn) => {
      hideUsersFromFeed.add(conn.fromUserId.toString());
      hideUsersFromFeed.add(conn.toUserId.toString());
    });

    const feed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(["firstName", "lastName", "photoUrl", "gender", "skills"])
      .skip(skip)
      .limit(limit);

    res.json({ data: feed });

    //all the cards in db - except their own, profiles they have connected with, profile they have ignored, already sent connection request to
  } catch (error) {
    res.status(400).send("ERROR : ", error.message);
  }
});

module.exports = userRouter;
