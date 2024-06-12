const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { NODE_ENV } = process.env;

// Middleware function to authenticate user
const authMiddleware = async (req, res, next) => {
  if (NODE_ENV === "test" && req.header("X-BypassAuth") === "true") {
    req.user = {
      _id: "abc",
      role: "admin",
      username: "testuser",
    }
    return next()
  }

  // Extract the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorisation denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });
    // Attach the user object to the request
    req.user = user;
    console.log(decoded);
    next();
  } catch (error) {
    console.error("Token error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
