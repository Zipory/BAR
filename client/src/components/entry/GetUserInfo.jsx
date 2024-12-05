import React, { useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {CheckToken} from '../entry/CheckToken'
import { userInfo } from "../../App";
import { FetchToken } from '../Fetch';


/*components that do use effect to get the user info
 from the token inside the LS. */
const GetUserInfo = () => {
    const url = `/user/info`;
    const [user, setUser] = useContext(userInfo);
     const navigate = useNavigate();
    useEffect(() => {
        if(!CheckToken()) {
        navigate("/home");
      } else {
        FetchToken(url, setUser);
      }
    }, []);
   
  return (
    <div></div>
  )
}

export default GetUserInfo;