const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return req.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodeToken;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, while verifying the token",
    });
  }
};
