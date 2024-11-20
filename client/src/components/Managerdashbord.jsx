import React, { useContext, useState, useEffect, useRef } from "react";
import "../style/ManagerDashboard.css";
import Info from "./manager/Info";
import Futureevents from "./manager/Futureevents.jsx";
import History from "./manager/History.jsx";
import { FetchIncludeHeader, FetchPost } from "./Fetch.js";
import { userInfo } from "../App";
import { typeOfUser } from "../App.js";
import Newevent from "./manager/Newevent.jsx";
import Allevents from "./waiter/Allevents.jsx";
import EventDetails from "./EventDetails.jsx";
import { useNavigate } from "react-router-dom";
import { getToken } from "./entry/CheckToken.js";

const ManagerDashboard = () => {
  const [user, setUser] = useContext(userInfo);
  let status = "aproved";
  const serverUrl = `http://localhost:4000/events/my-events/${status}`;
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);
  const navigate = useNavigate();
  let isAwaiter2 = JSON.parse(window.localStorage.getItem("isWaiter"));
  const divRef = useRef(null);
  useEffect(() => {
    if (isAwaiter2) {
      console.log("a waiter");
      navigate("/home");
    }
  }, []);
  useEffect(() => {
    if (history.length > 0) {
      setShowHistory(true);
    }
  }, [history]);
  const getHistory = () => {
    status = "past";
    const serverUrl = `http://localhost:4000/events/my-events/${status}`;
    FetchIncludeHeader(serverUrl, user?.email, setHistory, getToken());
  };

  useEffect(() => {
    // Attach event listener on component mount
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      // console.log(27, "hi");
      setShowModal(false);
    }
  };
  return (
    <div className="manager-dashboard">
      <Info />

      {/* Create New Event Button */}
      <button className="big-button" onClick={() => setShowModal(true)}>
        ליצירת אירוע חדש
      </button>
      <div ref={divRef}>
        {showModal && (
          <Newevent setShowModal={setShowModal} eventStatus={"new-event"} />
        )}
      </div>
      {/* Future Events Window */}
      {/* <Futureevents /> */}
      {/* View History Button */}
      <button className="medium-button" onClick={() => getHistory()}>
        היסטורית אירועים
      </button>
      <History history={history} />
      {/* <EventDetails eventInfo={history}/> */}
      <div className="meter" dir="ltr">
        <div className="inner-meter">4 / 6</div>
      </div>
      {/* <Allevents/> */}
    </div>
  );
};

export default ManagerDashboard;

/** {showHistory && } */
