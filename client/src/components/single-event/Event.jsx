import "../../style/eventDetails.css";
import React from "react";
import EventDetails from "./EventDitails";
import { getToken } from "../entry/CheckToken";
import CancelButton from "./CancelButton";
import SendRequestButton from "./SendRequestButton";
import DeleteButton from "./DeleteButton";
import GetPendingWaiters from "../manager/request/GetPendingWaiters";
import GetApprovedWaiters from "../manager/request/GetApprovedWaiters";

const Event = ({ eventInfo }) => {
  let [token, isWaiter] = getToken();
  //   return for waiter.
  if (isWaiter) {
    return (
      <div className="waiter-event event-details">
        <CancelButton eventID={eventInfo.id} />
        <EventDetails eventInfo={eventInfo} />
        <SendRequestButton eventID={eventInfo.id} />
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
