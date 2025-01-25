const jwt = require("jsonwebtoken");
const JWT_SECRET = "Valid User";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.userID = decoded.user_id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Authentification Failed: " + err.message});
  }
};  

module.exports = userAuth;