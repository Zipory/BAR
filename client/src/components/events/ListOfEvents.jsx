import React, { useState, useEffect } from "react";
import ToggledComponent from "./ToggledComponent";

/**getting future events of all users. */
const ListOfEvents = ({ isVisible, events , appendButton}) => {
  return <div>{isVisible && <ToggledComponent events={events} appendButton={appendButton}/>}</div>;
};

export default ListOfEvents;
