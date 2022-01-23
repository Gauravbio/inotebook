const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
// const { findOne } = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "harryisagoodboy";
var fetchuser = require("../middleware/fetchuser");

// ROUTE: 1: creating a user using post"api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a valid password minimum of 5 characters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors return bad requestand the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether user with same email exists already
    try {
      //finding user matching with it
      let user = await User.findOne({ email: req.body.email });
      //if user already exists
      if (user) {
        return res
          .status(400)
          .json({ success,error: "sorry user with this email exists" });
      }
      // creating salt for password
      const salt = await bcryptjs.genSalt(10);
      const secPass = await bcryptjs.hash(req.body.password, salt);
      //if user not exist create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        id: user.id,
      };
      //creating authentication token by which we can differentiate between real ans fake user
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

// ROUTE: 2: authenticate a user using post"api/auth/login".No login required
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors return bad requestand the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const passwordCompare = await bcryptjs.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success,error: "please try to login with correct credentials" });
      }
      const data = {
        id: user.id
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE: 3: Get loggedin user details using post"api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    
    let userId=req.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
