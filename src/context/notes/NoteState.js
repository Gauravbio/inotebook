import NoteContext from "./notecontext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //fetchnote
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGJmOTUyZDk0NWZhN2UyZWZmODM5NSIsImlhdCI6MTY0MjU3NTA4M30.U1z63_owHtpk9gixuf_TRDtJT0lwk74BYjzhexCcJy8",
      }
    });
    const json=await response.json();
    console.log(json);
    setNotes(json);
  }

  //addnote
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGJmOTUyZDk0NWZhN2UyZWZmODM5NSIsImlhdCI6MTY0MjU3NTA4M30.U1z63_owHtpk9gixuf_TRDtJT0lwk74BYjzhexCcJy8",
      },
      body: JSON.stringify({title,description,tag}),
    });

    const note=await response.json();
    setNotes(notes.concat(note));
  };

  //deletenote
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGJmOTUyZDk0NWZhN2UyZWZmODM5NSIsImlhdCI6MTY0MjU3NTA4M30.U1z63_owHtpk9gixuf_TRDtJT0lwk74BYjzhexCcJy8",
      }
    });
    const json=response.json();
    console.log(json);
    
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //editnote
  const editNote = async (id, title, description,tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGJmOTUyZDk0NWZhN2UyZWZmODM5NSIsImlhdCI6MTY0MjU3NTA4M30.U1z63_owHtpk9gixuf_TRDtJT0lwk74BYjzhexCcJy8",
      },
      body: JSON.stringify({title,description,tag}),
    });
     const json=await response.json();
     console.log(json);
     let newNotes=JSON.parse(JSON.stringify(notes))

    //logic to add in client
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
       newNotes[i].description = description;
        newNotes[i].tag=tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
