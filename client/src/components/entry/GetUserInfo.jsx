import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {CheckToken,  getToken } from '../entry/CheckToken'
import { userInfo } from "../../App";
import { FetchToken } from '../Fetch';

/*components that do use effect to get the user info
 from the token inside the LS. */
const GetUserInfo = () => {
    const serverUrl = "http://localhost:4000/user/info";
    const [user, setUser] = useContext(userInfo);
     const navigate = useNavigate();
    useEffect(() => {
        if(!CheckToken()) {
        navigate("/home");
      } else {
        const token = getToken();
        FetchToken(serverUrl, token, setUser);
      }
    }, []);
   
  return (
    <div></div>
  )
}

export default GetUserInfo;