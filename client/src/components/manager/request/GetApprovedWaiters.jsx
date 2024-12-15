import React, { useEffect, useState } from "react";
import { FetchToken } from "../../Fetch";
import WaiterInfo from "./WaiterInfo";

const GetApprovedWaiters = ({ eventID, timeToRate }) => {
  const [approvedWaiters, setApprovedWaiters] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  let status = "approved";
  const approvedWaitersApi = `/requests/get-requests/${status}/${eventID}`;
  useEffect(() => {
    FetchToken(approvedWaitersApi, setApprovedWaiters);
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };
  const openModal = () => setIsVisible(true);

  // פונקציה לסגירת המודאל
  const closeModal = () => setIsVisible(false);

  return (
    <div>
      <button
        onClick={toggleVisibility}
        disabled={approvedWaiters.length === 0}>
        {isVisible ? "הסתר" : "הראה"} מלצרים רשומים
      </button>
      {isVisible && (
        <ToggledComponent
          requests={approvedWaiters}
          eventID={eventID}
          closeModal={closeModal}
          timeToRate={timeToRate}
        />
      )}
    </div>
  );
};

const ToggledComponent = ({ requests, eventID, closeModal, timeToRate }) => {
  return (
    <>
      <div className="overlay" onClick={closeModal}></div>
      <ol className="modal">
        <span className="close-btn" onClick={closeModal}>
          &times;
        </span>
        {requests.map((val, indx) => (
          <li className="li-event" event={val[0]} key={indx}>
            <WaiterInfo info={val} eventID={eventID} timeToRate={timeToRate}/>
          </li>
        ))}
      </ol>
    </>
  );
};

export default GetApprovedWaiters;
