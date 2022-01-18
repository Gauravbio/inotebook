import React from "react";
import Alert from "./Alert";
// import Addnote from "./Addnote";
// import noteContext from "../context/notes/notecontext";
import Notes from "./Notes";

export const Home = () => {
  return (
    <div>
      <Alert/>
      <Notes />
    </div>
  );
};
export default Home;
