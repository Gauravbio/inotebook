const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
// const { findOne } = require("../models/User");
const bcryptjs =require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET='harryisagoodboy';

router.post(
  "/createUser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a valid password minimum of 5 characters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
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
          .json({ error: "sorry user with this email exists" });
      }
      // creating salt for password
      const salt=await bcryptjs.genSalt(10);
      const secPass=await bcryptjs.hash(req.body.password,salt);
      //if user not exist create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data={
        id: user.id
      }
      //creating authentication token by which we can differentiate between real ans fake user
      const authtoken=jwt.sign(data,JWT_SECRET);
      res.json(authtoken);
    } 
    catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
