import React,{useContext,useState} from "react";
import noteContext from "../context/notes/notecontext";

const Addnote = (props) => {
    const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title: "", description: "",tag:""})
  const handleClick=(e) => {
      e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
    props.showAlert("Added successfully","success")
  }
  const onChange = (e)=> {
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <h1>Add a Note</h1>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5} required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5} required
              value={note.description}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
