const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE: 1: Get get all the notes using get"api/auth/getuser". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.id });
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

// ROUTE: 3: updating an existing note using delete"api/notes/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // find the note which has to be uptaded and update it
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(401).send("not found");

    if (note.user.toString() != req.id) {
      res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

// ROUTE: 4: deleting an existing note using delete"api/notes/deletenote". login required

router.delete("/deletenote/:id",fetchuser,async (req,res) => {
  try {
    //find the note which has to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {return res.status(401).send("not found");}

    //allow deletion only if user owns his note
    if (note.user.toString() != req.id) {
      res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndDelete(
      req.params.id
    )
    res.json({"success": "note has been deleted"});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  } 
})
module.exports = router;
