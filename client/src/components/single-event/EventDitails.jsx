import React from "react";
import AdjustMeter from "./AdjustMeter";
import FractionMeter from "./FractionMeter";

const EventDetails = ({ eventInfo, company }) => {
  return (
    <div className="">
      <p>ארוע {eventInfo.status === "Canceled" ? "מבוטל" : "קיים "}</p>
      <h2>
        <strong>{eventInfo.company_name}</strong>
      </h2>
      <h2>פרטי הארוע</h2>
      <p>
        <strong>תאור הארוע: </strong>
        {eventInfo.event_description || "אין תאור לארוע"}
      </p>
      <p>
        <strong>תאריך:</strong> {eventInfo.e_date}
      </p>
      <p>
        <strong>זמן התחלה:</strong> {eventInfo.e_time}
      </p>
      <p>
        <strong>אורך הארוע:</strong> {eventInfo.e_duration} שעות
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
      <FractionMeter  numerator={eventInfo.approved_waiters ?? 0} denominator={eventInfo.waiters_amount}/>
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
