import React, { useState, useEffect, useRef } from "react";
import "../style/ManagerDashboard.css";
import Info from "./manager/Info";
import GetAllFutureEvents from "./events/GetAllFutureEvents.jsx";
import GetMyFutureEvents from "./events/GetMyFutureEvents.jsx";
import GetMyPastEvents from "./events/GetMyPastEvents.jsx";
import Newevent from "./manager/Newevent.jsx";
import { useNavigate } from "react-router-dom";
const ManagerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef(null);

  // check that the user is event-manager.
  const navigate = useNavigate();
  let isWaiter = JSON.parse(window.localStorage.getItem("isWaiter"));
  useEffect(() => {
    if (isWaiter) {
      console.log("a waiter");
      navigate("/home");
    }
  }, []);

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

      {/* ----------------------new way to see the events---------------------------- */}
      <div className="buttons">
        <section>
          <GetAllFutureEvents />
        </section>
        <section>
          <GetMyFutureEvents />
        </section>
        <section>
          <GetMyPastEvents />
        </section>
      </div>
    </div>
  );
};

export default ManagerDashboard;
