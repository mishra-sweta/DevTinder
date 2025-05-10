const express = require("express");
const requestsRouter = express.Router();

const { userAuth } = require("../middleware/auth");

requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName + " sent a connection request");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = requestsRouter;
