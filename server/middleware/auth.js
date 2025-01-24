const jwt = require("jsonwebtoken");
const JWT_SECRET = "Valid User";

export const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userID = decoded.user.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Authentification Failed" });
  }
};  

export const loginAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userID = decoded.user.id;
    return next();
  } catch (err) {
    req.body.userID = undefined;
    return next();
  }
};