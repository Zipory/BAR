import "../style/waiterDashboard.css";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./waiter/info";
import ListOfEvents from "./events/ListOfEvents";
import { userInfo } from "../App";
import { FetchToken } from "./Fetch";
const WaiterDashboard = () => {
  let isWaiter = JSON.parse(window.localStorage.getItem("isWaiter"));
  const [user, setUser] = useContext(userInfo);
  const [allEvents, setAllEvents] = useState([]);
  const [allEventsIsVisible, setAlleventsIsVisible] = useState(false);
  const [pastEvents, setPastEvents] = useState([]);
  const [pastEventsIsVisible, setPastEventsIsVisible] = useState(false);
  const [futureEvents, setfutureEvents] = useState([]);
  const [futureEventsIsVisible, setFutureEventsIsVisible] = useState(false);
  const [pendingEvents, setpendingEvents] = useState([]);
  const [pendingEventsIsVisible, setpendingEventsIsVisible] = useState(false);
  const appendButton = true;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isWaiter) {
      console.log("not a waiter");
      navigate("/home");
    }
  }, []);

  /* api to get all events lists, and set them on there state. */
  const apiUrlAllEvents = "/events";
  const apiUrlFutureEvents = `/events/my-events/future`;
  const apiUrlPastEvents = `/events/my-events/past`;
  const apiUrlPendingEvents = `/events/my-events/pending`;
  useEffect(() => {
    FetchToken(apiUrlAllEvents, setAllEvents);
    FetchToken(apiUrlFutureEvents, setfutureEvents);
    FetchToken(apiUrlPastEvents, setPastEvents);
    FetchToken(apiUrlPendingEvents, setpendingEvents);
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

  const toggleVisibilityOfPendingEvents = (event) => {
    setpendingEventsIsVisible((prevState) => !prevState);
    event.currentTarget.classList.toggle("clicked");
  };

  const disableButton = (eventsList) => eventsList.length === 0;

  return (
    <>
      <h1 className="name">
        {user?.first_name} {user?.last_name}
      </h1>
      <div className="dashboard">
        {/* <UserInfo /> */}
        <section>
          {/* {button to see all events} */}
          <button
            disabled={disableButton(allEvents)}
            onClick={(event) => toggleVisibilityOfAllEvents(event)}
          >
            {allEventsIsVisible ? "הסתר " : "הראה "}
            <strong>{allEvents.length  > 0 ? allEvents.length : " "}</strong> אירועים כלליים
          </button>
          {/* {button to see future events} */}
          <button
            disabled={disableButton(futureEvents)}
            onClick={(event) => toggleVisibilityofFutureEvents(event)}
          >
            {futureEventsIsVisible ? "הסתר " : "הראה "}
            <strong>{futureEvents.length  > 0 ? futureEvents.length : " "}</strong> אירועים עתידיים
          </button>
          {/* {button to see past events} */}
          <button
            disabled={disableButton(pendingEvents)}
            onClick={(event) => toggleVisibilityOfPendingEvents(event)}
          >
            {pendingEventsIsVisible ? "הסתר " : "הראה "}
            <strong>{pendingEvents.length  > 0 ? pendingEvents.length : " "}</strong> אירועים בהמתנה
          </button>
          <button
            disabled={disableButton(pastEvents)}
            onClick={(event) => toggleVisibilityofPastEvents(event)}
          >
            {pastEventsIsVisible ? "הסתר " : "הראה "}
            <strong>{pastEvents.length  > 0 ? pastEvents.length : " "}</strong> אירועים שעברו
          </button>
        </section>
      </div>
      {/* ----------------new way to see the events---------------------- */}
      <div className="buttons">
        <section>
          <ListOfEvents
            isVisible={allEventsIsVisible}
            events={allEvents}
            appendButton={appendButton}
          />
        </section>
        <section>
          <ListOfEvents
            isVisible={futureEventsIsVisible}
            events={futureEvents}
          />
        </section>
        <section>
          <ListOfEvents
            isVisible={pendingEventsIsVisible}
            events={pendingEvents}
          />
        </section>
        <section>
          <ListOfEvents isVisible={pastEventsIsVisible} events={pastEvents} />
        </section>
      </div>
    </>
  );
};

export default WaiterDashboard;
