import React, { useState, useEffect } from "react";
import { FetchToken } from "../../Fetch";
import { getToken } from "../../entry/CheckToken";
import Event from "../../single-event/Event";
import UserInfo from "../../waiter/info";
import WaiterInfo from "./WaiterInfo";
import AppendWaiterButton from "./AppendWaiterButton";

const GetRequests = ({ eventID }) => {
  const [requests, setRequests] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  let status = "pending";
  // let id = { event_id: eventID };
  const getReqApi = `http://localhost:4000/requests/get-requests/${status}/${eventID}`;

  useEffect(() => {
    FetchToken(getReqApi, getToken(), setRequests);
  }, []);


  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? "הסתר" : "הראה"} בקשות הצטרפות
      </button>
      {isVisible && <ToggledComponent requests={requests} eventID={eventID}/>}
    </div>
  );
};

const ToggledComponent = ({ requests, eventID }) => {
  console.log("hi", requests);
  return (
    <div>
      {requests.map((val, indx) => (
        <li className="li-event" event={val[0]} key={indx}>
          <WaiterInfo info={val}/>
          <AppendWaiterButton waiterID={val.id} eventID={eventID}/>
        </li>
      ))}
    </div>
  );
};

export default GetRequests;



