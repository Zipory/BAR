import "../style/waiterDashboard.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./waiter/info";
import PendingEvents from "./waiter/pendingEvents";
import GetAllFutureEvents from "./events/GetAllFutureEvents";
import GetMyFutureEvents from "./events/GetMyFutureEvents";
import GetMyPastEvents from "./events/GetMyPastEvents";

const WaiterDashboard = () => {
  let isAwaiter2 = JSON.parse(window.localStorage.getItem("isWaiter"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAwaiter2) {
      console.log("not a waiter");
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <h2>
        <UserInfo />
      </h2>
      {/* ----------------new way to see the events---------------------- */}
      <section><GetAllFutureEvents/></section>
      <section><PendingEvents/></section>
        <section><GetMyFutureEvents/></section>
        <section><GetMyPastEvents/></section>
    </div>
  );
};

export default WaiterDashboard;
