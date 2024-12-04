import "../../style/eventDetails.css";
import React, { useEffect, useState } from "react";
import EventDetails from "./EventDitails";
import { getToken } from "../entry/CheckToken";
import CancelButton from "./CancelButton";
import SendRequestButton from "./SendRequestButton";
import DeleteButton from "./DeleteButton";
import GetPendingWaiters from "../manager/request/GetPendingWaiters";
import GetApprovedWaiters from "../manager/request/GetApprovedWaiters";
import RatingComponent from "../rating/SetRating";
import { FetchPP } from "../Fetch";

const Event = ({ eventInfo, appendButton }) => {
  const [possible, setPossible] = useState(false);
  let [token, isWaiter] = getToken();

  const posibleToRateApi = "http://localhost:4000/rating/possible-to-rate";
  async function CheckPossibility() {
    console.log("hi");

    let myInfo = {
      event_id: 3,
      waiter_id: 3,
    };
    useEffect(() => {
      if (isWaiter) {
        FetchPP(posibleToRateApi, myInfo).then((res) => {
          if (res?.succeed) {
            console.log(res);
            setPossible(true);
          }
        });
      }
    }, [possible]);
  }
  CheckPossibility();
  //   return for waiter.
  if (isWaiter) {
    return (
      <div className="waiter-event event-details">
        <EventDetails eventInfo={eventInfo} />
        {appendButton&& <div className="waiter-btn"> 
        <SendRequestButton eventID={eventInfo.id} />
           <CancelButton eventID={eventInfo.id} />
        </div>}
   
        {possible && (
          <RatingComponent
            name={eventInfo.company_name}
            eventID={eventInfo.id}
          />
        )}
      </div>
    );
  }
  //   return for event-manager.
  else {
    return (
      <div className="manager-event event-details">
        <EventDetails eventInfo={eventInfo} />
        {appendButton&& <div  className="manager-btn">
        <GetPendingWaiters eventID={eventInfo.id} />
        <GetApprovedWaiters eventID={eventInfo.id} />
        <DeleteButton eventID={eventInfo.id} />
        </div>}
      </div>
    );
  }
};

export default Event;
