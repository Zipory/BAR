
import React from "react";
import { FetchPP } from "../Fetch";

const SendRequestButton = ({ eventID }) => {
  const newReqApi = "/requests/new-request";
  const handlePending = () => {
    let id = { event_id: eventID };

    FetchPP(newReqApi, id)
      .then
      // () => window.location.reload()
      ();
  };

  return (
    <h2>
      <button type="button" onClick={handlePending} className="plus-btn">
        +
      </button>
    </h2>
  );
};

export default SendRequestButton;
