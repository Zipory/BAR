import "../../style/eventDetails.css"
import React from "react";
import EventDetails from "./EventDitails";
import { getToken } from "../entry/CheckToken";
import CancelButton from "./CancelButton";
import SendRequestButton from "./SendRequestButton";
import DeleteButton from "./DeleteButton";

const Event = ({eventInfo}) => {
  let [token, isWaiter] = getToken();
  //   return for waiter.
  if (isWaiter) {
      return (
          <div className="waiter-event event-details">
        <CancelButton/>
        <EventDetails eventInfo={eventInfo}/>
        <SendRequestButton/>
      </div>
    );
} 
//   return for event-manager.
  else {
    return (
      <div className="manager-event event-details">
        <DeleteButton id={eventInfo.id}/>
        <EventDetails />
      </div>
    );
  }
};

export default Event;
