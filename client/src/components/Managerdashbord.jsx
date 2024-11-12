import React, { useContext, useState, useEffect, useRef } from "react";
import "../style/ManagerDashboard.css";
import Info from "./manager/Info";
import Futureevents from "./manager/Futureevents.jsx";
import History from "./manager/History.jsx";
import { FetchIncludeHeader, FetchPost } from "./Fetch.js";
import { userInfo } from "../App";
import { typeOfUser } from "../App.js";
import Newevent from "./manager/Newevent.jsx";

const ManagerDashboard = () => {
  const [user, setUser] = useContext(userInfo);
  const serverUrl = `http://localhost:4000/events/${user?.email}`;
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);
  const divRef = useRef(null);
  useEffect(() => {
    if (history.length > 0) {
      setShowHistory(true);
    }
  }, [history]);
  const getHistory = () => {
    FetchIncludeHeader(serverUrl, user?.email, setHistory, isAwaiter);
  };

  useEffect(() => {
    // Attach event listener on component mount
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      // console.log(27, "hi");
      setShowModal(false);
    }
  }
  return (
    <div className="manager-dashboard">
      <Info />

      {/* Create New Event Button */}
      <button className="big-button" onClick={() =>setShowModal(true)}>
        ליצירת אירוע חדש
      </button>
      <div ref={divRef}> {showModal && <Newevent/>}</div>
     
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
