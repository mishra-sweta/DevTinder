const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is invalid!");
  } else if (firstName.length >= 20 || firstName.length < 2) {
    throw new Error(
      "Your First Name Should be longer than 2 and shorter than 20 characters"
    );
  } else if (lastName.length >= 20 || lastName.length < 2) {
    throw new Error(
      "Your Last Name Should be longer than 2 and shorter than 20 characters"
    );
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is invalid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validatePasswordChange = (req) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (!(newPassword === confirmNewPassword)) {
    throw new Error("Passwords don't match");
  } else if (newPassword === oldPassword) {
    throw new Error("You can't change it to the old password");
  } else if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Please enter a strong password");
  }
};

const validateEditFields = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "about",
    "skills",
    "age",
    "gender",
    "photoURL",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};
module.exports = {
  validateSignUpData,
  validateEditFields,
  validatePasswordChange,
};
