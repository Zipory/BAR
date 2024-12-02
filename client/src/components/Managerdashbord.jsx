import React, { useState, useEffect, useRef, useContext } from "react";
import "../style/ManagerDashboard.css";
import Info from "./manager/Info";
import GetAllFutureEvents from "./events/GetAllFutureEvents.jsx";
import Newevent from "./manager/Newevent.jsx";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../App";
import { FetchToken } from "./Fetch.js";
const ManagerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef(null);
  const [user, setUser] = useContext(userInfo);
  const [allEvents, setAllEvents] = useState([]);
  const [allEventsIsVisible, setAlleventsIsVisible] = useState(false);
  const [pastEvents, setPastEvents] = useState([]);
  const [pastEventsIsVisible, setPastEventsIsVisible] = useState(false);
  const [futureEvents, setfutureEvents] = useState([]);
  const [futureEventsIsVisible, setFutureEventsIsVisible] = useState(false);
  // check that the user is event-manager.
  const navigate = useNavigate();
  let isWaiter = JSON.parse(window.localStorage.getItem("isWaiter"));
  /**if the user is a waiter, go home */
  useEffect(() => {
    if (isWaiter) {
      console.log("a waiter");
      navigate("/home");
    }
  }, []);


  /* api to get all events, and set them on there state. */
  const apiUrlAllEvents = "http://localhost:4000/events";
  const apiUrlFutureEvents = `http://localhost:4000/events/my-events/future`;
  const apiUrl = `http://localhost:4000/events/my-events/past`;
  useEffect(() => {
    FetchToken(apiUrlAllEvents, setAllEvents);
    FetchToken(apiUrlFutureEvents, setfutureEvents);
    FetchToken(apiUrl, setPastEvents);
  }, []);


  const toggleVisibilityOfAllEvents = () => {
    setAlleventsIsVisible((prevState) => !prevState);
  };

  const toggleVisibilityofFutureEvents = () => {
    setFutureEventsIsVisible((prevState) => !prevState);
  };
  const toggleVisibilityofPastEvents = () => {
    setPastEventsIsVisible((prevState) => !prevState);
  };

/**for the new event modal. */
  useEffect(() => {
    // Attach event listener on component mount
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
/**go out from the modal when click outside. */
  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  return (
    <div className="manager-dashboard">
      {/* <Info /> */}
      <h1>{user?.company_name}</h1>
        {/* Create New Event Button */}
      <button className="big-button" onClick={() => setShowModal(true)}>
        ליצירת אירוע חדש
      </button>
      <div ref={divRef}>
        {showModal && (
          <Newevent setShowModal={setShowModal} eventStatus={"new-event"} />
        )}
      </div>
      <section>
      {/* {button to see all events} */}
      <button onClick={toggleVisibilityOfAllEvents} >
      {allEventsIsVisible ? "הסתר" : "הראה"}   אירועים כלליים
        </button>
        {/* {button to see future events} */}
        <button onClick={toggleVisibilityofFutureEvents}>
        {futureEventsIsVisible ? "הסתר" : "הראה"} אירועים עתידיים
      </button>
          {/* {button to see past events} */}
          <button onClick={toggleVisibilityofPastEvents} >
          {pastEventsIsVisible ? 'הסתר' : 'הראה'} אירועים שעברו
        </button>
        </section>
    
      {/* ----------------------new way to see the events---------------------------- */}
      <div className="buttons">
        <section>
          <GetAllFutureEvents isVisible={allEventsIsVisible} events={allEvents}/>
        </section>
        <section>
          <GetAllFutureEvents  isVisible={futureEventsIsVisible} events={futureEvents}/>
        </section>
        <section>
          <GetAllFutureEvents  isVisible={pastEventsIsVisible} events={pastEvents}/>
        </section>
      </div>
    </div>
  );
};

export default ManagerDashboard;
