import React, { useState, useEffect } from "react";
import ToggledComponent from "./ToggledComponent";

/**getting future events of all users. */
const ListOfEvents = ({ isVisible, events }) => {
  return <div>{isVisible && <ToggledComponent events={events} />}</div>;
};

export default ListOfEvents;
