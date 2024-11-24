import React, { useContext, useEffect, useState } from "react";
import { userInfo } from "../../App";
import { FetchIncludeHeader } from "../Fetch";
// import EventDetails from "../EventDetails";
import { typeOfUser } from "../../App";
import { getToken } from "../entry/CheckToken";
import Event from "../single-event/Event";

// need to be deleted!!!!!!!!!!!!!
const Futureevents = () => {
  const [user, setUser] = useContext(userInfo);
  const [events, setEvents] = useState([]);
  const [onlyFutureEvents, setOnlyFutureEvents] = useState([]);
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);
  let status = "aproved";
  /* api to get the future event. */
  const apiUrl = `http://localhost:4000/events/my-events/${status}`;

  /* function that return the precentage (%) of the progress bar. */
  const percentage = (event) => {
    return (event.numberOfWaiters / event.numberOfWaitersNeeded) * 100;
  };



  /*start with fetching to set the events array. */
  useEffect(() => {
    FetchIncludeHeader(apiUrl, user?.email, setEvents, getToken());
  }, []);
  return (
    <div className="future-events">
      <h3>אירועים עתידים:</h3>
      <ul>
        <li> אירוע 1: בית הנשיא ירושלים - 12/03/25 == 4/5 מלצרים</li>
        <li>אירוע 2: כיכר החתולות ירושלים - 16/03/25 == 3/3 מלצרים</li>
        <li>אירוע 3: רמדה רנסאנס ירושלים - 01/04/25 == 2/10 מלצרים</li>
        {/* <progress value="37" max="100"></progress> */}
        {/* <meter value={events.numberOfWaiters} max={events.numberOfWaitersNeeded}>{percentage(events[0])}%</meter> */}
        {events.succeed && events.map((event, index) => (
        <li>אירוע: <Event/></li>
      ))}
      </ul>
    </div>
  );
};

export default Futureevents;
