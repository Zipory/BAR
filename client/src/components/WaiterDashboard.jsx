import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WaiterDashboard = () => {
  let isAwaiter2 =JSON.parse( window.localStorage.getItem("isWaiter"));
  const navigate = useNavigate();
  useEffect(() => {
 if (!isAwaiter2) {
    console.log("not a waiter");
    navigate("/home");
  }
  }, []);
 
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default WaiterDashboard;
