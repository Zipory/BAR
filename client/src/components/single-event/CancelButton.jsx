import React from "react";
import { FetchDD } from "../Fetch";
import { getToken } from "../entry/CheckToken";

const CancelButton = ({ eventID }) => {
  const newReqApi = "http://localhost:4000/requests/cancel-request";
  const handleCancel = () => {
    let id = { event_id: eventID };
    FetchDD(newReqApi, id, getToken());
  };

  return (
    <h2>
      <button type="button" onClick={handleCancel}>
        בטל זימון
      </button>
    </h2>
  );
};

export default CancelButton;