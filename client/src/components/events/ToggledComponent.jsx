import React from "react";
import Event from "../single-event/Event";
import { FetchToken } from "../Fetch";
import { useState, useEffect } from "react";

const ToggledComponent = ({ events, appendButton, title, setSomeChange }) => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    FetchToken("/requests/all-requests", setRequestList);
  }, []);

  return (
    <>
      {title && <h2 className="events-title">{title}</h2>}
      <ol>
        {events.map((val, indx) => (
          <li className="li-event" event={val[0]} key={indx}>
            <Event
              eventInfo={val}
              appendButton={appendButton}
              requestList={requestList}
              setSomeChange={setSomeChange}
            />
          </li>
        ))}
      </ol>
    </>
  );
};

export default ToggledComponent;
