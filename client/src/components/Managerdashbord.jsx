import React, { useState, useEffect, useRef, useContext } from "react";
import "../style/ManagerDashboard.css";
import Info from "./manager/Info";
import ListOfEvents from "./events/ListOfEvents.jsx";
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
  const appendButton = true;
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

  const toggleVisibilityOfAllEvents = (event) => {
    setAlleventsIsVisible((prevState) => !prevState);
    event.currentTarget.classList.toggle("clicked");
  };

  const toggleVisibilityofFutureEvents = (event) => {
    setFutureEventsIsVisible((prevState) => !prevState);
    event.currentTarget.classList.toggle("clicked");
  };
  const toggleVisibilityofPastEvents = (event) => {
    setPastEventsIsVisible((prevState) => !prevState);
    event.currentTarget.classList.toggle("clicked");
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

  const disableButton = (eventsList) => eventsList.length === 0;
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
        {/* {button to see future events} */}
        <button
          disabled={disableButton(futureEvents)}
          onClick={(event) => toggleVisibilityofFutureEvents(event)}
        >
          {futureEventsIsVisible ? "הסתר" : "הראה "}
          <strong>{futureEvents.length  > 0 ? futureEvents.length : " "}</strong> אירועים עתידיים
        </button>
        {/* {button to see past events} */}
        <button
          disabled={disableButton(pastEvents)}
          onClick={(event) => toggleVisibilityofPastEvents(event)}
        >
          {pastEventsIsVisible ? "הסתר " : "הראה "}
          <strong>{pastEvents.length > 0 ? pastEvents.length : " "}</strong>
          אירועים שעברו
        </button>
        {/* {button to see all events} */}
        <button
          disabled={disableButton(allEvents)}
          onClick={(event) => toggleVisibilityOfAllEvents(event)}
        >
          {allEventsIsVisible ? "הסתר" : "הראה "}
          <strong>{allEvents.length > 0 ? allEvents.length : " "}</strong> אירועים כלליים
        </button>
      </section>

      {/* ----------------------new way to see the events---------------------------- */}
      <div className="buttons">
        <section>
          <ListOfEvents isVisible={allEventsIsVisible} events={allEvents} />
        </section>
        <section>
          <ListOfEvents
            isVisible={futureEventsIsVisible}
            events={futureEvents}
            appendButton={appendButton}
          />
        </section>
        <section>
          <ListOfEvents isVisible={pastEventsIsVisible} events={pastEvents} />
        </section>
      </div>
    </div>
  );
};

export default ManagerDashboard;
