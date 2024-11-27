import React, { useEffect, useState } from "react";
import { getToken } from "../../entry/CheckToken";
import { FetchToken } from "../../Fetch";
import WaiterInfo from "./WaiterInfo";

const GetApprovedWaiters = ({ eventID }) => {
  const [approvedWaiters, setApprovedWaiters] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  let status = "approved";
  const approvedWaitersApi = `http://localhost:4000/requests/get-requests/${status}/${eventID}`;
  useEffect(() => {
    FetchToken(approvedWaitersApi, getToken(), setApprovedWaiters);
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? "הסתר" : "הראה"} מלצרים רשומים
      </button>
      {isVisible && (
        <ToggledComponent requests={approvedWaiters} eventID={eventID} />
      )}
    </div>
  );
};

const ToggledComponent = ({ requests, eventID }) => {
  return (
    <ol>
      {requests.map((val, indx) => (
        <li className="li-event" event={val[0]} key={indx}>
          <WaiterInfo info={val} eventID={eventID}/>
        </li>
      ))}
    </ol>
  );
};

export default GetApprovedWaiters;
