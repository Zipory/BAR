import "../../style/eventDetails.css";
import React, { useEffect, useState, useContext } from "react";
import EventDetails from "./EventDitails";
import { getToken } from "../entry/CheckToken";
import CancelButton from "./CancelButton";
import SendRequestButton from "./SendRequestButton";
import DeleteButton from "./DeleteButton";
import GetPendingWaiters from "../manager/request/GetPendingWaiters";
import GetApprovedWaiters from "../manager/request/GetApprovedWaiters";
import RatingComponent from "../rating/SetRating";
import { FetchPP, FetchToken } from "../Fetch";
import MessageButton from "../single-event/MessageButton";
import { userInfo } from "../../App";
const Event = ({ eventInfo, appendButton, requestList }) => {
// console.log(eventInfo);


  const [possible, setPossible] = useState(false);
  let [token, isWaiter] = getToken();
  const [requestCon, setRequestCon] = useState(null);
  const [cancelCon, setCancelCon] = useState(null);
  const [user, setUser] = useContext(userInfo);
  // console.log(user);
  // useEffect(() => {
  //   const waiterRequest = "http://localhost:4000/events/my-events//";
  //   FetchToken(waiterRequest + "future", setRequestCon);
  //   FetchToken(waiterRequest + "pending", setCancelCon);
  // }, []);
  const eventRequest = requestList.filter(
    (req) => req.event_id == eventInfo.id
  )[0];

  const posibleToRateApi = `/rating/possible-to-rate`;
  // async function CheckPossibility() {
  //   // console.log("hi");

  //   let myInfo = {
  //     event_id: eventInfo.id,
  //     waiter_id: 10,
  //   };
  //   useEffect(() => {
  //     if (isWaiter) {
  //       FetchPP(posibleToRateApi, myInfo).then((res) => {
  //         if (res?.succeed) {
  //           console.log(res);
  //           setPossible(true);
  //         }
  //       });
  //     }
  //   }, [possible]);
  // }
  // CheckPossibility();

  //   return for waiter.
  if (isWaiter) {
    return (
      <div className="waiter-event event-details">
        <EventDetails eventInfo={eventInfo} />
        {appendButton && (
          <div className="waiter-btn">
            {eventRequest?.status ? (
              eventRequest.status === "Pending" ||
              eventRequest.status === "Approved" ? (
                <CancelButton eventID={eventInfo.id} />
              ) : (
                <MessageButton />
              )
            ) : (
              <SendRequestButton eventID={eventInfo.id} />
            )}
          </div>
        )}

      {/* will show only in past events, then the user don't have buttons. */}
        {!appendButton && (
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
        <EventDetails eventInfo={eventInfo} appendButton={appendButton} />
        {appendButton && (
          <div className="manager-btn">
            <GetPendingWaiters eventID={eventInfo.id} />
            <GetApprovedWaiters eventID={eventInfo.id} />
            <DeleteButton eventID={eventInfo.id} />
          </div>
        )}
      </div>
    );
  }
};

export default Event;
