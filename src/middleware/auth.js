const adminAuth = (req, res, next) => {
  console.log("Middleware func for auth check");
  const token = "abcd";
  const isAdmin = token === "abcd";
  if (!isAdmin) {
    res.status(401).send("Unauthorised User");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Middleware func for auth check");
  const token = "qwerty";
  const isUser = token === "qwerty1";
  if (!isUser) {
    res.status(401).send("Unauthorised User");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
