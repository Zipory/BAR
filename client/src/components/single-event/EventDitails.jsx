import React, { useState } from "react";
import FractionMeter from "./FractionMeter";

const EventDetails = ({ eventInfo, company, appendButton }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // פונקציה לפתיחת המודאל
  const openModal = () => setIsModalOpen(true);

  // פונקציה לסגירת המודאל
  const closeModal = () => setIsModalOpen(false);
  if (eventInfo.avg_rating == null) eventInfo.avg_rating = "עוד לא דורג";
  return (
    <div className="event-details-show">
      {/* מציג את כל פרטי האירוע */}
      <div className="event-item" onClick={openModal}>
        <h2>{eventInfo.company_name}</h2>
        <p>{appendButton ?? "⭐" + eventInfo.avg_rating}</p>
        <p>סטטוס: {eventInfo.status === "Canceled" ? "מבוטל" : "קיים"}</p>
        <p>📅 תאריך: {eventInfo.e_date}</p>
        <p>⏲️ שעה: {eventInfo.e_time}</p>
        <p>מיקום: {eventInfo.location}</p>
        <p>אורך הארוע: {eventInfo.e_duration} שעות</p>
        <p>כמות מלצרים שדרושה: {eventInfo.waiters_amount}</p>
        <p>כמות מלצרים שרשומים: {eventInfo.approved_waiters ?? 0}</p>
        <p>
          💵 שכר: {eventInfo.salary} {eventInfo.is_global ? "גלובלי" : "לשעה"}
        </p>
        <p>כולל שינה: {eventInfo.has_sleep ? "כן" : "לא"}</p>
      </div>

      {/* המודאל שמופיע במרכז */}
      {isModalOpen && (
        <>
          <div className="overlay" onClick={closeModal}></div>
          <div className="modal">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <h2>פרטי הארוע</h2>
            <p>{appendButton ?? "⭐" + eventInfo.avg_rating}</p>
            <p>
              <strong>סטטוס: </strong>
              {eventInfo.status === "Canceled" ? "מבוטל" : "קיים"}
            </p>
            <h3>
              <strong>{eventInfo.company_name}</strong>
            </h3>
            <p>
              <strong>תיאור האירוע: </strong>
              {eventInfo.event_description || "אין תאור לארוע"}
            </p>
            <p>
              <strong>📅 תאריך: </strong>
              {eventInfo.e_date}
            </p>
            <p>
              <strong>⏲️ שעה: </strong>
              {eventInfo.e_time}
            </p>
            <p>
              <strong>אורך הארוע: </strong>
              {eventInfo.e_duration} שעות
            </p>
            <p>
              <strong>מיקום: </strong>
              {eventInfo.location}, מס' {eventInfo.suite}
            </p>
            <p>
              <strong>כמות מלצרים שדרושה: </strong>
              {eventInfo.waiters_amount}
            </p>
            <p>
              <strong>כמות מלצרים שרשומים: </strong>
              {eventInfo.approved_waiters ?? 0}
            </p>
            <FractionMeter
              numerator={eventInfo.approved_waiters ?? 0}
              denominator={eventInfo.waiters_amount}
            />
            <p>
              <strong>💵 שכר: </strong>
              {eventInfo.salary} {eventInfo.is_global ? "גלובלי" : "לשעה"}
            </p>
            <p>
              <strong>כולל שינה: </strong>
              {eventInfo.has_sleep ? "כן" : "לא"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetails;

// import React, { useState } from "react";
// import FractionMeter from "./FractionMeter";

// const EventDetails = ({ eventInfo, company }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="event-details-show">
//       {/* כפתור פתיחת המודאל */}
//       <button onClick={openModal}>צפה בפרטי הארוע</button>

//       {/* המודאל עם overlay */}
//       {isModalOpen && (
//         <>
//           <div className="overlay" onClick={closeModal}></div>
//           <div className="modal">
//             <span className="close-btn" onClick={closeModal}>
//               &times;
//             </span>
//             <h2>פרטי הארוע</h2>
//             <p>
//               <strong>סטטוס: </strong>
//               {eventInfo.status === "Canceled" ? "מבוטל" : "קיים"}
//             </p>
//             <h3>
//               <strong>{eventInfo.company_name}</strong>
//             </h3>
//             <p>
//               <strong>תיאור האירוע: </strong>
//               {eventInfo.event_description || "אין תאור לארוע"}
//             </p>
//             <p>
//               <strong>📅 תאריך: </strong>
//               {eventInfo.e_date}
//             </p>
//             <p>
//               <strong>⏲️ שעה: </strong>
//               {eventInfo.e_time}
//             </p>
//             <p>
//               <strong>אורך הארוע: </strong>
//               {eventInfo.e_duration} שעות
//             </p>
//             <p>
//               <strong>מיקום: </strong>
//               {eventInfo.location}, מס' {eventInfo.suite}
//             </p>
//             <p>
//               <strong>כמות מלצרים שדרושה: </strong>
//               {eventInfo.waiters_amount}
//             </p>
//             <p>
//               <strong>כמות מלצרים שרשומים: </strong>
//               {eventInfo.approved_waiters ?? 0}
//             </p>
//             <FractionMeter
//               numerator={eventInfo.approved_waiters ?? 0}
//               denominator={eventInfo.waiters_amount}
//             />
//             <p>
//               <strong>💵 שכר: </strong>
//               {eventInfo.salary} {eventInfo.is_global ? "גלובלי" : "לשעה"}
//             </p>
//             <p>
//               <strong>כולל שינה: </strong>
//               {eventInfo.has_sleep ? "כן" : "לא"}
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default EventDetails;
