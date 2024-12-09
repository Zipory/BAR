import React from "react";
import { FetchDD } from "../Fetch";
const CancelButton = ({ eventID }) => {
  const newReqApi = `/requests/cancel-request`;
  const handleCancel = () => {
    let id = { event_id: eventID };
    FetchDD(newReqApi, id);
  };

  return (
    <h2>
      <button type="button" onClick={handleCancel} className="log-out">
       בטל זימון<br/>
        <small>(לחיצה כפולה)</small>
      </button>
    </h2>
  );
};
export default CancelButton;