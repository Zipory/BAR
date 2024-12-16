import React, { useEffect, useState } from "react";
import RatingComponent from "../../rating/SetRating";
import { FetchNewEvent, FetchPP } from "../../Fetch";
const  defaultProfil = require("../../../images/SmileyFace.png") 
const WaiterInfo = ({info, eventID, timeToRate}) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      const [possible, setPossible] = useState(false);
      const posibleToRateApi = `/rating/possible-to-rate`;
        let myInfo = {
          event_id: eventID,
          waiter_id: info.id,
        };
        console.log("info",myInfo);
        
        useEffect(() => {
         FetchNewEvent(posibleToRateApi, myInfo, setPossible);
        }, []);

  useEffect(() => {
    console.log("possible: ", possible);
    if (possible?.succeed != undefined) {
      console.log("inside possible succeed");
      if (!info.face_url) info.face_url = defaultProfil;
      let shortName = `${info.first_name[0]}${info.last_name[0]}`;
      if (possible.succeed == false) {
        setPossible(false);
      }
    }
  }, [possible]);

  function transformGender(gender) {
   return gender === "Other" ? "אחר" : gender === "Female" ? "נקבה" : "זכר"
  }

  return (
    <div>
        <div>
          <img className="profil"
            src={info.face_url}
            alt="תמונת פרופיל"
            width="50px"
            height="50px"
          />
        </div>
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
        <strong>מגדר:</strong> {transformGender( info.gender)}
      </p>
      <p>
        <strong>ממוצע ניקוד:</strong> {info.avg_rating ?? "אין דרוג"}
      </p>
      {timeToRate && (
        <RatingComponent
          name={info.first_name + " " + info.last_name}
          eventID={eventID}
          waiterID={info.id}
        />
       )} 
    </div>
  );
};

export default WaiterInfo;
