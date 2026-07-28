const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const verifyAccessToken = (token) => {
   return jwt.verify(token,process.env.JWT_SECRET);
}
module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
