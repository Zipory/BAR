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
import { FetchPP, FetchToken } from "../Fetch";
import MessageButton from "../single-event/MessageButton";

const Event = ({ eventInfo, appendButton, requestList }) => {

  const [possible, setPossible] = useState(false);
  let [token, isWaiter] = getToken();
  const [requestCon, setRequestCon] = useState(null);
  const [cancelCon, setCancelCon] = useState(null);

  // useEffect(() => {
  //   const waiterRequest = "http://localhost:4000/events/my-events//";
  //   FetchToken(waiterRequest + "future", setRequestCon);
  //   FetchToken(waiterRequest + "pending", setCancelCon);
  // }, []);
  const posibleToRateApi = "http://localhost:4000/rating/possible-to-rate";
  const eventRequest = requestList.filter(
    (req) => req.event_id == eventInfo.id
  )[0];

  const posibleToRateApi = `/rating/possible-to-rate`;
  async function CheckPossibility() {
    // console.log("hi");

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
