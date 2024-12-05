import React, { useState, useEffect } from "react";
import { FetchToken } from "../../Fetch";
import WaiterInfo from "./WaiterInfo";
import AppendWaiterButton from "./AppendWaiterButton";
const GetPendingWaiters = ({ eventID }) => {
  const [pendingWaiters, setPendingWaiters] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  let status = "pending";
  const pendingWaitersApi = `/requests/get-requests/${status}/${eventID}`;
  useEffect(() => {
    FetchToken(pendingWaitersApi, setPendingWaiters);
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? "הסתר" : "הראה"} בקשות הצטרפות
      </button>
      {isVisible && (
        <ToggledComponent requests={pendingWaiters} eventID={eventID} />
      )}
    </div>
  );
};

const ToggledComponent = ({ requests, eventID }) => {
  return (
    <ol>
      {requests.map((val, indx) => (
        <li className="li-event" event={val[0]} key={indx}>
          <WaiterInfo info={val} />
          <AppendWaiterButton waiterID={val.id} eventID={eventID} />
        </li>
      ))}
    </ol>
  );
};

export default GetPendingWaiters;
