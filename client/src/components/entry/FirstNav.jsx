import React from 'react'
import { CheckToken, getToken } from '../entry/CheckToken'
import { useNavigate } from 'react-router-dom'

const FirstNav = () => {
    const navigate = useNavigate();
    if (CheckToken()) {
        let navTo = getToken()[1] === false ? "events-manager" : "waiter";
        console.log("have token",getToken());
        navigate(`/${navTo}`);
    }
    else {
        navigate('/home');
    }
  return (
    <div><h1>טוען נתונים...</h1></div>
  )
}

export default FirstNav;