const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE: 1: Get get all the notes using get"api/auth/getuser". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

// ROUTE: 2: add a new note using post"api/notes/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "enter a valid description minimum of 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors return bad requestand the errors
      const errors = validationResult(req);
      //after validations checking errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.id,
      });
      //saving note in json format in database
      const savednote = await note.save();
      
      res.json(savednote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);
module.exports = router;
