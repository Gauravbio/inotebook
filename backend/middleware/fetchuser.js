const jwt = require("jsonwebtoken");
const JWT_SECRET = "harryisagoodboy";

const fetchuser = (req, res, next) => {
  //get the user from the jwt token ans add id to req object
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: "please authenticate user a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.id = data.id;
    next();
  } catch (error) {
      res.status(401).send({ error: "please authenticate user a valid token" });
  }
};
module.exports = fetchuser;
