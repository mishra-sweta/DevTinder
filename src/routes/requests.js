const express = require("express");
const requestsRouter = express.Router();
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middleware/auth");

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const existingUser = await User.findById(toUserId);
      if (!existingUser) {
        throw new Error("User doesn't exist!");
      }

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status request!");
      }

      const existingConnection = await ConnectionRequest.findOne({
        $or: [
          { toUserId, fromUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });
      if (existingConnection) {
        return res
          .status(400)
          .json({ message: "Connection request already exists!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: `${req.user.firstName} ${status} -> ${existingUser.firstName}`,
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

requestsRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const allowedStatus = ["accepted", "rejected"];
      const { status, requestId } = req.params;

      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status request!");
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        throw new Error("No connection requests!");
      }
      connectionRequest.status = status;
      await connectionRequest.save();
      res.json({ message: "Request was " + status, connectionRequest });
    } catch (error) {
      res.status(400).json({ message: "Error: " + error.message });
    }
  }
);

module.exports = requestsRouter;
