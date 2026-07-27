const jwt = require("jsonwebtoken");

const customerAuthMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        message: "Authorization token missing.",
      });

    }

    const token = authHeader.split(" ")[1];

    if (!token) {

      return res.status(401).json({
        message: "Invalid authorization header.",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.customer = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid or expired token.",
    });

  }

};

module.exports = customerAuthMiddleware;
