import React from "react";
import { FetchPP } from "../Fetch";

const SendRequestButton = ({ eventID, toSetRequests }) => {
  const newReqApi = "/requests/new-request";
  const handlePending = () => {
    const [increment, setIncrement] = toSetRequests;
    let id = { event_id: eventID };

    FetchPP(newReqApi, id).then(() => {
      console.log("im increment in request button");

      setIncrement(increment + 1);
    });
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
