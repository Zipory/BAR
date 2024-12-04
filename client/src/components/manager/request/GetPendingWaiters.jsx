import React, { useState, useEffect } from "react";
import { FetchToken } from "../../Fetch";
import WaiterInfo from "./WaiterInfo";
import AppendWaiterButton from "./AppendWaiterButton";

const GetPendingWaiters = ({ eventID }) => {
  const [pendingWaiters, setPendingWaiters] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  let status = "pending";
  const pendingWaitersApi = `http://localhost:4000/requests/get-requests/${status}/${eventID}`;
  useEffect(() => {
    FetchToken(pendingWaitersApi, setPendingWaiters);
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };
  const openModal = () => setIsVisible(true);

  // פונקציה לסגירת המודאל
  const closeModal = () => setIsVisible(false);
  return (
    <div>
      <button onClick={toggleVisibility} disabled={pendingWaiters.length === 0}>
        {isVisible ? "הסתר" : "הראה"} בקשות הצטרפות
      </button>
      {isVisible && (
        <ToggledComponent
          requests={pendingWaiters}
          eventID={eventID}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

const ToggledComponent = ({ requests, eventID, closeModal }) => {
  return (
    <>
      <div className="overlay" onClick={closeModal}></div>
      <ol className="modal">
        <span className="close-btn" onClick={closeModal}>
          &times;
        </span>
        {requests.map((val, indx) => (
          <li className="li-event" event={val[0]} key={indx}>
            <WaiterInfo info={val} />
            <AppendWaiterButton waiterID={val.id} eventID={eventID} />
          </li>
        ))}
      </ol>
    </>
  );
};

export default GetPendingWaiters;
