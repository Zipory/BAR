import React from "react";
import { FetchPP } from "../Fetch";

const SendRequestButton = ({ eventID, toSet }) => {
  const newReqApi = "/requests/new-request";
  const handlePending = () => {
    const [increment, setIncrement] = toSet;
    let id = { event_id: eventID };

    FetchPP(newReqApi, id).then(() => {
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
