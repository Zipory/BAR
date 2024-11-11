import React from "react";
import "../style/eventDetails.css"
import { FetchDelete } from "./Fetch";
import Newevent from "./manager/Newevent";
const EventDetails = ({ eventInfo , company}) => {
  const urlDelete = "events/delete-event"
  return (
    <div className="event-details">
      <button >Edit</button>
      <button onClick={() =>FetchDelete(urlDelete, company?.email, eventInfo)}>Delete</button>
      <h2>Event Details</h2>
      <p><strong>תאריך:</strong> {eventInfo.e_date}</p>
      <p><strong>זמן התחלה:</strong> {eventInfo.e_time}</p>
      <p><strong>אורך האירוע:</strong> {eventInfo.e_duration} שעות</p>
      <p><strong>מיקום:</strong> {eventInfo.location}, מס' {eventInfo.suite}</p>
      <p><strong>תאור האירוע:</strong> {eventInfo.description || "No description provided"}</p>
      <p><strong>Number of Waiters:</strong> {eventInfo.waiters_amount}</p>
      <p><strong>Payment:</strong> {eventInfo.salary} {eventInfo.is_global ? "Global" : "Hourly"}</p>
      <p><strong>Includes Sleep:</strong> {eventInfo.has_sleep ? "Yes" : "No"}</p>
    </div>
  );
};

export default EventDetails;