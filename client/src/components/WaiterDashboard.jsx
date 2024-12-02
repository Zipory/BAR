import "../style/waiterDashboard.css";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./waiter/info";
import GetAllFutureEvents from "./events/GetAllFutureEvents";
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
  const navigate = useNavigate();
  useEffect(() => {
    if (!isWaiter) {
      console.log("not a waiter");
      navigate("/home");
    }
  }, []);

  /* api to get all events lists, and set them on there state. */
  const apiUrlAllEvents = "http://localhost:4000/events";
  const apiUrlFutureEvents = `http://localhost:4000/events/my-events/future`;
  const apiUrlPastEvents = `http://localhost:4000/events/my-events/past`;
  const apiUrlPendingEvents = `http://localhost:4000/events/my-events/pending`;
  useEffect(() => {
    FetchToken(apiUrlAllEvents, setAllEvents);
    FetchToken(apiUrlFutureEvents, setfutureEvents);
    FetchToken(apiUrlPastEvents, setPastEvents);
    FetchToken(apiUrlPendingEvents, setpendingEvents);
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

  const toggleVisibilityOfPendingEvents = () => {
    setpendingEventsIsVisible((prevState) => !prevState);
  };
  return (
    <>
      <h1 className="name">
        {user?.first_name} {user?.last_name}
      </h1>
      <div className="dashboard">
        {/* <UserInfo /> */}
        <section>
          {/* {button to see all events} */}
          <button onClick={toggleVisibilityOfAllEvents}>
            {allEventsIsVisible ? "הסתר" : "הראה"} אירועים כלליים
          </button>
          {/* {button to see future events} */}
          <button onClick={toggleVisibilityofFutureEvents}>
            {futureEventsIsVisible ? "הסתר" : "הראה"} אירועים עתידיים
          </button>
          {/* {button to see past events} */}
          <button onClick={toggleVisibilityofPastEvents}>
            {pastEventsIsVisible ? "הסתר" : "הראה"} אירועים שעברו
          </button>
          <button onClick={toggleVisibilityOfPendingEvents}>
            {pendingEventsIsVisible ? "הסתר" : "הראה"} אירועים בהמתנה
          </button>
        </section>
      </div>
      {/* ----------------new way to see the events---------------------- */}
      <div className="buttons">
        <section>
          <GetAllFutureEvents
            isVisible={allEventsIsVisible}
            events={allEvents}
          />
        </section>
        <section>
          <GetAllFutureEvents
            isVisible={futureEventsIsVisible}
            events={futureEvents}
          />
        </section>
        <section>
          <GetAllFutureEvents
            isVisible={pendingEventsIsVisible}
            events={pendingEvents}
          />
        </section>
        <section>
          <GetAllFutureEvents
            isVisible={pastEventsIsVisible}
            events={pastEvents}
          />
        </section>
      </div>
    </>
  );
};

export default WaiterDashboard;
