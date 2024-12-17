import React from "react";
import { Link } from "react-router-dom";

const GoHomeButton = () => {
  return (
    <Link to={"/home"}>
      <button style={{ marginBottom: "5vh" }}>חזרה</button>
    </Link>
  );
};

export default GoHomeButton;
