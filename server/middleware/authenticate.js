const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  console.log("authenticate");

  // get the token from Authorization header
  const token = req.headers.authorization;
  console.log("req.cookies", token);
  //   const token = req.cookies.token;

  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate };
