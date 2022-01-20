import React, { useContext } from "react";
import noteContext from "../context/notes/notecontext";

const Noteitem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote}=context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      
      <div className="card">
        
        <div className="card-body">
          <div>
          <h5 className="card-title">{note.title}</h5>
          </div>
          <p className="card-text">
           {note.description}
          </p>
          <i className="far fa-trash-alt mx-2" onClick={()=> {deleteNote(note._id)}}></i>
          <i className="far fa-edit" onClick={()=> {updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
