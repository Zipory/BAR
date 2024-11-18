import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FetchToken } from "../Fetch";
import { userInfo } from "../../App";
export default function CheckToken() {
  const serverUrl = "http://localhost:4000/user-info";
  const [isOk, setIsOk] = useState(false);
  const [user, setUser] = useContext(userInfo);
  const getToken = () => {
    return [
      window.localStorage.getItem("bar"),
      window.localStorage.getItem("isWaiter"),
    ];
  };

  const navigate = useNavigate();
  let token = getToken();
  console.log(token);
  useEffect(() => {
    if (!token[0] || !token[1]) {
      navigate("/home");
    } else {
      FetchToken(serverUrl, token, setUser);
      setIsOk( () => true);
    }
  }, []);
  return isOk;
}
