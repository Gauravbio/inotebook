import React from "react";

const Noteitem = (props) => {
  const { note } = props;
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
          <i className="far fa-trash-alt mx-2"></i>
          <i className="far fa-edit"></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
