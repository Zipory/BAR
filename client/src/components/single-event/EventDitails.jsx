import React from "react";

const EventDetails = ({ eventInfo, company }) => {
  return (
    <div className="">
      <h2><strong>{eventInfo.company_name}</strong></h2>
      <h2>פרטי האירוע</h2>
      <p>
        <strong>תאור האירוע:</strong>
        {eventInfo.event_description || "אין תאור לאירוע"}
      </p>
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
        <strong>כמות מלצרים שדרושה:</strong> {eventInfo.waiters_amount}
      </p>
      <p>
        <strong>כמות מלצרים שרשומים:</strong> {eventInfo.approved_waiters ?? 0}
      </p>
      <p>
        <strong>תשלום:</strong> {eventInfo.salary}
        {eventInfo.is_global ? "גלובלי" : "לשעה"}
      </p>
      <p>
        <strong>כולל שינה:</strong> {eventInfo.has_sleep ? "כן" : "לא"}
      </p>
    </div>
  );
};

export default EventDetails;
