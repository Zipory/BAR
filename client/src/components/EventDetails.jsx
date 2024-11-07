import React from "react";
import "../style/eventDetails.css"
const EventDetails = ({ eventInfo }) => {
  return (
    <div className="event-details">
      <h2>Event Details</h2>
      <p><strong>תאריך:</strong> {eventInfo.e_date}</p>
      <p><strong>זמן התחלה:</strong> {eventInfo.e_time}</p>
      <p><strong>אורך האירוע:</strong> {eventInfo.length} שעות</p>
      <p><strong>מיקום:</strong> {eventInfo.city} {eventInfo.street}, מס' {eventInfo.suite}</p>
      <p><strong>תאור האירוע:</strong> {eventInfo.description || "No description provided"}</p>
      <p><strong>Number of Waiters:</strong> {eventInfo.waitersSum}</p>
      <p><strong>Payment:</strong> {eventInfo.payment} {eventInfo.globaly ? "Global" : "Hourly"}</p>
      <p><strong>Includes Sleep:</strong> {eventInfo.sleep ? "Yes" : "No"}</p>
    </div>
  );
};

export default EventDetails;