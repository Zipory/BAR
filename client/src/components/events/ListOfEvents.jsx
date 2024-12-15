import React, { useState, useEffect } from "react";
import ToggledComponent from "./ToggledComponent";

/**getting future events of all users. */
const ListOfEvents = ({
  isVisible,
  events,
  appendButton,
  title,
  setSomeChange,
  timeToRate,
}) => {
  return (
    <>
      <div>
        {isVisible && (
          <ToggledComponent
            title={title}
            events={events}
            appendButton={appendButton}
            setSomeChange={setSomeChange}
            timeToRate={timeToRate}
          />
        )}
      </div>
    </>
  );
};

export default ListOfEvents;
