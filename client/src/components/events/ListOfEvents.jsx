import React, { useState, useEffect } from "react";
import ToggledComponent from "./ToggledComponent";

/**getting future events of all users. */
const ListOfEvents = ({
  isVisible,
  events,
  appendButton,
  title,
  setSomeChange,
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
          />
        )}
      </div>
    </>
  );
};

export default ListOfEvents;
