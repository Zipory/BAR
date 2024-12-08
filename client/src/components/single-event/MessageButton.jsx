import React from "react";

const MessageButton = () => {
  return (
    <h2>
      <button
        type="button"
        onClick={() =>
          alert(
            "אינך יכול להירשם שוב מכיוון שכבר נרשמת לאירוע וביטלת/נדחית על ידי המנהל"
          )
        }
        className="log-out">
        אינך יכול להירשם שוב{" "}
      </button>
    </h2>
  );
};

export default MessageButton;
