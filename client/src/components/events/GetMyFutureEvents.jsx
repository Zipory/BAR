import React, { useState, useEffect } from "react";
import { FetchToken } from "../Fetch";
import Event from "../single-event/Event";

/**getting future events that connect to the user. */
const GetMyFutureEvents = ({isVisible, events}) => {
  // const [events, setEvents] = useState([]);
  // const [isVisible, setIsVisible] = useState(false);
  // let status = "future";
  // /* api to get the future event. */
  // const apiUrl = `http://localhost:4000/events/my-events/${status}`;
  // useEffect(() => {
  //   FetchToken(apiUrl, setEvents);
  // }, []);

  // const toggleVisibility = () => {
  //   setIsVisible((prevState) => !prevState);
  // };

  return (
    <div>
      {/* <button onClick={toggleVisibility}>
        {isVisible ? "הסתר" : "הראה"} אירועים עתידיים
      </button> */}
      {isVisible && <ToggledComponent events={events} />}
    </div>
  );
};

const ToggledComponent = ({ events }) => {
  return (
    <ol>
      {events.map((val, indx) => (
        <li className="li-event" event={val[0]} key={indx}>
          <Event eventInfo={val} />
        </li>
      ))}
    </ol>
  );
};

export default GetMyFutureEvents;
