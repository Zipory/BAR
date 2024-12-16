import React from "react";
import { FetchDD } from "../Fetch";
import { useState } from "react";
const CancelButton = ({ eventID, toSetRequests }) => {
  const [increment, setIncrement] = toSetRequests;

  const newReqApi = `/requests/cancel-request`;
  const handleCancel = () => {
    let id = { event_id: eventID };
    FetchDD(newReqApi, id).then(() => {
      setIncrement(increment + 1);
    });
  };

  return (
    <h2>
      <button type="button" onClick={handleCancel} className="log-out">
        בטל זימון
        <br />
        <small>(לחיצה כפולה)</small>
      </button>
    </h2>
  );
};
export default CancelButton;
