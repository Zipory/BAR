import React, { useState } from "react";
import { getToken } from "../entry/CheckToken";
import { FetchPP } from "../Fetch";

const RatingComponent = ({ name, eventID, waiterID}) => {
  
  const [rating, setRating] = useState(0);
  let [token, isAwaiter] = getToken();
  const ratingUrl = "http://localhost:4000/rating/new-rating";
  const handleRatingChange = (value) => {
    setRating(value);
  };

  function sendRating() {
    const result = {
      waiterName: name,
      event_id: eventID,
      waiter_id: waiterID,
      rating,
    };
    FetchPP(ratingUrl, result);
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
     {!isAwaiter && <h3>נא לדרג את השירות של: {name}</h3>}
     {isAwaiter && <h3>נא לדרג את היחס שקבלת מחברת: {name}</h3>}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {[...Array(6).keys()].map((value) => (
          <button
            key={value}
            onClick={() => handleRatingChange(value)}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: value === rating ? "#4caf50" : "#ddd",
              color: value === rating ? "white" : "black",
              border: "1px solid gray",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={sendRating}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          שמור דירוג
        </button>
      </div>
    </div>
  );
};

export default RatingComponent;
