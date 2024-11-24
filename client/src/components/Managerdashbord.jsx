import React, { useContext, useState, useEffect, useRef } from "react";
import "../style/ManagerDashboard.css";
import Info from "./manager/Info";
import GetAllFutureEvents from "./events/GetAllFutureEvents.jsx";
import GetMyFutureEvents from "./events/GetMyFutureEvents.jsx";
import GetMyPastEvents from "./events/GetMyPastEvents.jsx";
import Futureevents from "./manager/Futureevents.jsx";
import { userInfo } from "../App";
import Newevent from "./manager/Newevent.jsx";
import { useNavigate } from "react-router-dom";
// import GetRequests from "./manager/request/GetRequests.jsx";
const ManagerDashboard = () => {
  // const [user, setUser] = useContext(userInfo);
  // let status = "aproved";
  // const serverUrl = `http://localhost:4000/events/my-events/${status}`;
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef(null);

  // check that the user is event-manager.
  const navigate = useNavigate();
  let isAwaiter2 = JSON.parse(window.localStorage.getItem("isWaiter"));
  useEffect(() => {
    if (isAwaiter2) {
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

      {/* <div className="meter" dir="ltr">
        <div className="inner-meter">4 / 6</div>
      </div> */}

      {/* ----------------------new way to see the events---------------------------- */}
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
  );
};

export default ManagerDashboard;
