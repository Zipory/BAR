import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FetchToken } from "./Fetch";
import { userInfo } from "../App";
import useUserEffect from "../hooks/useUserEffect";
// import { userInfo } from "../../App";
import "../style/HomePage.css";
const Authorization = () => {
  const serverUrl = "http://localhost:4000/user-info";
  const [user, setUser] = useContext(userInfo);

  function getToken() {
    return [
      window.localStorage.getItem("bar"),
      window.localStorage.getItem("isWaiter"),
    ];
  }

  const navigate = useNavigate();
  let token = getToken();
  console.log(token);
  useEffect(() => {
    if (!token[0] || !token[1]) {
      navigate("/home");
    } else {
    /** need to do is Awaiter inside the local-storage. */
      FetchToken(serverUrl, token, setUser);
      navigate("/events-manager");
    }
  }, [token]);

  return (
    <div className="Authorization">
      <h1>טוען נתונים...</h1>
    </div>
  );
};

export default Authorization;
