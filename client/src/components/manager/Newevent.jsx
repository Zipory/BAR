import React, { useState } from "react";
import Calendar from "./Calender";

const Newevent = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <h1>Create New Event</h1>
      <form>
        <Calendar setDate={setDate}/>
        <input type="date" disabled value={date}/>
      </form>
    </div>
  );
};

export default Newevent;
