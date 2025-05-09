const validator = require("validator");

const validateSignUpData = async (req) => {
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

module.exports = { validateSignUpData };
