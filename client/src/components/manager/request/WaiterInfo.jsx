import React from "react";
import RatingComponent from "../../rating/SetRating";
import { FetchPP } from "../../Fetch";
import { getToken } from "../../entry/CheckToken";

const WaiterInfo = ({info, eventID}) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      const ratingUrl = "http://localhost:4000/rating/new-rating";
      function sendRating(result) {
        console.log(result);
        FetchPP(ratingUrl, result, getToken());
      }
  return (
    <div>
      <p>
        <strong>שם:</strong> {info.first_name} {info.last_name}
      </p>
      <p>
        <strong>מייל:</strong> {info.email}
      </p>
      <p>
        <strong>טלפון:</strong> {info.phone}
      </p>
      <p>
        <strong>תאריך לידה:</strong> {formatDate(info.birthday)}
      </p>
      <p>
        <strong>מגדר:</strong> {info.gender}
      </p>
      <p>
        <strong>ניקוד:</strong> {info.avg_rating ?? "אין דרוג"}
      </p>
        <RatingComponent 
        name={ info.first_name + " " +info.last_name} 
        eventID={eventID} 
        waiterID={info.id} 
        onSave={sendRating}/>
    </div>
  );
};

export default WaiterInfo;
