import jwt from "jsonwebtoken";

// Verify token middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    req.user = decoded; // Save user payload (id, email, role)
    next();
  });
};

// Restrict to admins only

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status({
      message: "Access Denied ,Admins Only",
    });
  }
  next();
};
module.exports = {
  verifyToken,
  isAdmin,
};
