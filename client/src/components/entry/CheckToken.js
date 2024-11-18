import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FetchToken } from "../Fetch";
import { userInfo } from "../../App";
export default async function CheckToken() {
  const serverUrl = "http://localhost:4000/user-info";
  const [isOk, setIsOk] = useState(false);
  const [user, setUser] = useContext(userInfo);
  const getToken = () => {
    let bar = window.localStorage.getItem("bar");
    let isAwaiter = window.localStorage.getItem("isWaiter");
    return [bar, JSON.parse(isAwaiter)];
  };
 
  const navigate = useNavigate();
  let token = getToken();
  console.log(token);
  // useEffect(() => {
  
  //   if (!token[0] || !(typeof token[1] === "boolean")) {
  //     navigate("/home");
  //   } else {
  //     FetchToken(serverUrl, token, setUser);
  //     setIsOk(true);
  //   }
  // }, []);
  console.log("hi");
  return <div></div>
}
