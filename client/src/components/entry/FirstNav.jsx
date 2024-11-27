import React from "react";
import { CheckToken, getToken } from "../entry/CheckToken";
import { useNavigate } from "react-router-dom";

const FirstNav = () => {
  const navigate = useNavigate();
  if (CheckToken()) {
    let navTo = getToken()[1] === false ? "events-manager" : "waiter";
    navigate(`/${navTo}`);
  } else {
    console.log("go home ");
    navigate("/home");
  }
  return (
    <div>
      <h1>טוען נתונים...</h1>
    </div>
  );
};

export default FirstNav;
