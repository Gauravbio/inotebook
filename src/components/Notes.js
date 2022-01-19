import React, { useContext } from "react";
import { useEffect } from "react";
import noteContext from "../context/notes/notecontext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(()=> {
    getNotes()
    //eslint-disable-next-line
  },[])
  return (
    <div>
      <Addnote />
      <div className="row my-3">
        <h2>Your notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
