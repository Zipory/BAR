import React, { useEffect, useState } from "react";
import { Fetch } from "../Fetch";
import FutureeEvent from "./FutureeEvent";
import EventDetails from "../EventDetails";
import { getToken } from "../entry/CheckToken";

const Allevents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    Fetch(apiUrl, getToken(),  setEvents);
  }, []);
  const apiUrl = "http://localhost:4000/events";

  return (
    <div>
      {events.map((val, indx) => (
        <li className="li-event" event={val[0]} key={indx}>
          event: <EventDetails eventInfo={val} />
        </li>
      ))}
    </div>
  );
};

export default Allevents;
