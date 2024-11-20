import React, {  useContext, useState, useEffect, useRef } from "react";
import "../style/eventDetails.css";
import { FetchDelete, FetchPut } from "./Fetch";
import Newevent from "./manager/Newevent";
import { userInfo } from "../App";
import { typeOfUser } from "../App";
import { getToken } from "./entry/CheckToken";
import ReqButton from "./extra/ReqButton";
const EventDetails = ({ eventInfo, company }) => {
  const urlDelete = "http://localhost:4000/events/delete-event";
  const [showModal, setShowModal] = useState(false);
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);
  const [user, setUser] = useContext(userInfo);
  const divRef = useRef(null);
function edit() {

}

useEffect(() => {
  // Attach event listener on component mount
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    // Clean up event listener on component unmount
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

const handleClickOutside = (event) => {
  if (divRef.current && !divRef.current.contains(event.target)) {
    // console.log(27, "hi");
    setShowModal(false);
  }
}

  return (
    <div className="event-details">
      {!isAwaiter && 
      <button  onClick={() =>setShowModal(true)}>ערוך מחדש</button>}
      {!isAwaiter && (
      <button onClick={() => FetchDelete(urlDelete, user.email, eventInfo, getToken())}> מחיקה </button> )}
        <div ref={divRef}> {showModal && <Newevent setShowModal={setShowModal} eventStatus={"update-event"}/>}</div>
        {isAwaiter && 
      <ReqButton eventID={eventInfo.id}/>}
      <h2>פרטי האירוע</h2>
      <p>
        <strong>תאריך:</strong> {eventInfo.e_date}
      </p>
      <p>
        <strong>זמן התחלה:</strong> {eventInfo.e_time}
      </p>
      <p>
        <strong>אורך האירוע:</strong> {eventInfo.e_duration} שעות
      </p>
      <p>
        <strong>מיקום:</strong> {eventInfo.location}, מס' {eventInfo.suite}
      </p>
      <p>
        <strong>תאור האירוע:</strong>{" "}
        {eventInfo.event_description || "אין תאור לאירוע"}
      </p>
      <p>
        <strong>כמות מלצרים:</strong> {eventInfo.waiters_amount}
      </p>
      <p>
        <strong>תשלום:</strong> {eventInfo.salary}{" "}
        {eventInfo.is_global ? "גלובלי" : "לשעה"}
      </p>
      <p>
        <strong>כולל שינה:</strong> {eventInfo.has_sleep ? "כן" : "לא"}
      </p>
    </div>
  );
};

export default EventDetails;
