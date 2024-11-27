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

const Event = ({ eventInfo }) => {
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
      FetchPP(posibleToRateApi, myInfo, getToken()).then((res) => {
        // if (res.succeede) {
          console.log(res);
          
          // setPossible(true);
        // }
      });
    }, [possible]);
  }
  // CheckPossibility();
  //   return for waiter.
  if (isWaiter) {
    return (
      <div className="waiter-event event-details">
        <CancelButton eventID={eventInfo.id} />
        <EventDetails eventInfo={eventInfo} />
        <SendRequestButton eventID={eventInfo.id} />
        <RatingComponent name={eventInfo.company_name} eventID={eventInfo.id} />
      </div>
    );
  }
  //   return for event-manager.
  else {
    return (
      <div className="manager-event event-details">
        <DeleteButton eventID={eventInfo.id} />
        <EventDetails eventInfo={eventInfo} />
        <GetPendingWaiters eventID={eventInfo.id} />
        <GetApprovedWaiters eventID={eventInfo.id} />
      </div>
    );
  }
};

export default Event;
