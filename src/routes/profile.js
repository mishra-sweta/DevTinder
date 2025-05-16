const express = require("express");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();
const {
  validateEditFields,
  validatePasswordChange,
} = require("../utils/validation");
const { userAuth } = require("../middleware/auth");

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.put("/edit", userAuth, async (req, res) => {
  try {
    const areFieldsValid = validateEditFields(req);

    if (!areFieldsValid) {
      return res.status(400).send("Update of fields not permitted");
    }

    const user = req.user;

    Object.keys(req.body).forEach((field) => {
      user[field] = req.body[field];
    });

    await user.save();

    res.json({
      message: `${user.firstName}, profile updated successfully`,
      data: user,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.put("/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    const isPasswordCorrect = await user.validatePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new Error("The old password is incorrect");
    } else {
      validatePasswordChange(req);
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();
      res.send("Password updated successfully");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
