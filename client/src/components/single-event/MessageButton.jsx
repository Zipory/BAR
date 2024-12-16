import React from "react";

const MessageButton = ({ text, alertText }) => {
  return (
    <h2>
      <button
        type="button"
        onClick={() =>
          alert(
            alertText
              ? alertText
              : "אינך יכול להירשם שוב מכיוון שכבר נרשמת לאירוע וביטלת/נדחית על ידי המנהל"
          )
        }
        className="log-out"
        style={{ backgroundColor: "gray" }}>
        {text ? text : "אינך יכול להירשם שוב"}
      </button>
    </h2>
  );
};

export default MessageButton;
