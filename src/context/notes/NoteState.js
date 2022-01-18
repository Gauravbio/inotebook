
import NoteContext from "./notecontext";
import { useState } from "react";
const NoteState= (props) => {
    const notesInitial= [
        {
          "_id": "61dd18adc74893cc55df62e2c",
          "user": "61dbf952d945fa7e2eff8395",
          "title": "my title",
          "description": "please wake up",
          "tag": "personal",
          "date": "2022-01-11T05:42:05.980Z",
          "__v": 0
        },
        {
          "_id": "61dd18aec7893cc535df62e2e",
          "user": "61dbf952d945fa7e2eff8395",
          "title": "my title",
          "description": "please wake up",
          "tag": "personal",
          "date": "2022-01-11T05:42:06.729Z",
          "__v": 0
        },
        {
          "_id": "61de7a32e3d736dfef10ff3fa",
          "user": "61dbf952d945fa7e2eff8395",
          "title": "my title",
          "description": "please wake up",
          "tag": "personal",
          "date": "2022-01-12T06:50:26.654Z",
          "__v": 0
        },
        {
          "_id": "61de7a4ce3d736df5ef0ff3fd",
          "user": "61dbf952d945fa7e2eff8395",
          "title": "my title",
          "description": "please wake up",
          "tag": "personal",
          "date": "2022-01-12T06:50:52.034Z",
          "__v": 0
        },
        {
          "_id": "61de7adde3d736dfef01ff403",
          "user": "61dbf952d945fa7e2eff8395",
          "title": "my title",
          "description": "please wake up",
          "tag": "personal",
          "date": "2022-01-12T06:53:17.240Z",
          "__v": 0
        }
      ]
      const [notes,setNotes]=useState(notesInitial);

      //addnote
      const addNote=(title,description,tag) => {
        console.log("adding a new note");
        const note={
          "_id": "61de7adde3d736dfef01ff4703",
          "user": "61dbf952d945fa7e2eff83956",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-01-12T06:53:17.240Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }

      //deletenote
      const deleteNote=(id) => {
        console.log("deleteing a note id: "+id);
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
      }

      //editnote
      const editNote=(id,title,description) => {
        
      }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;