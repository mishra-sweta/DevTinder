const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: (v) => `${v.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return validator.isStrongPassword(v);
        },
        message: (v) => `${v.value} is not a strong password!`,
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      validate: {
        validator: function (v) {
          return ["female", "male", "others"].includes(v);
        },
        message: (v) => `${v.value} is not a valid gender`,
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://i.pinimg.com/474x/14/90/37/14903760921cb84b305290a3ad4f596c.jpg",
      validate: {
        validator: function (v) {
          return validator.isURL(v) && /\.(jpg|jpeg|png|webp|gif)$/i.test(v);
        },
        message: (v) => `${v.value} is not a valid image URL`,
      },
    },
    about: {
      type: String,
      default: "This is the default bio.",
      maxLength: 200,
    },
    skills: {
      type: [String],
      validate: {
        validator: function (val) {
          return val.length <= 6;
        },
        message: "You can add up to 6 skills only",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
