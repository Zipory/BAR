import React, { useEffect, useState } from "react";
import RatingComponent from "../../rating/SetRating";
import { getToken } from "../../entry/CheckToken";
import { FetchNewEvent, FetchPP } from "../../Fetch";

const WaiterInfo = ({info, eventID}) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      const [possible, setPossible] = useState(false);
      let [token, isWaiter] = getToken();
    
      const posibleToRateApi = "http://localhost:4000/rating/possible-to-rate";
        let myInfo = {
          event_id: eventID,
          waiter_id: info.id,
        };
        useEffect(() => {
         FetchNewEvent(posibleToRateApi, myInfo, setPossible, getToken());
        }, []);
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
        <strong>ממוצע ניקוד:</strong> {info.avg_rating ?? "אין דרוג"}
      </p>
       {possible && <RatingComponent 
        name={ info.first_name + " " +info.last_name} 
        eventID={eventID} 
        waiterID={info.id} />}
    </div>
  );
};

export default WaiterInfo;
