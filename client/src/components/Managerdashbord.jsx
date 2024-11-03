import React, { useContext, useState, useEffect } from "react";
import "../style/ManagerDashboard.css";
import Info from "./manager/Info";
import Futureevents from "./manager/Futureevents.jsx";
import History from "./manager/History.jsx";
import { FetchPost } from "./Fetch.js";
import { userInfo } from "../App";
const serverUrl = "http://localhost:4000/";
const ManagerDashboard = () => {
  const [user, setUser] = useContext(userInfo);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    if (history.length > 0) {
      setShowHistory(true);
    }
  }, [history]);
  const getHistory = () => {
    FetchPost(serverUrl, { email: user.email }, setHistory);
  };
  return (
    <div className="manager-dashboard">
      <Info />

      {/* Create New Event Button */}
      <button className="big-button" onClick={() => alert("Create New Event")}>
        ליצירת אירוע חדש
      </button>

      {/* Future Events Window */}
      <Futureevents />

      {/* View History Button */}
      <button className="medium-button" onClick={() => getHistory()}>
        היסטורית אירועים
      </button>
      {showHistory && <History history={history} />}
      <div className="meter" dir="ltr">
        <div className="inner-meter">4 / 6</div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
