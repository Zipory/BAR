import React, { useState } from "react";
import Calendar from "./Calender";
import { Fetch } from "../Fetch";
import "../../style/new-event.css";
const Newevent = () => {
  const [date, setDate] = useState(new Date());
  const eventInfo = {};
  function handleForm(event) { 
    const { name, value, type, checked } = event.target;
  
    // Update the eventInfo object based on input type
    eventInfo[name] = type === 'checkbox' ? checked : value;
  
    console.log(eventInfo); // Log the updated eventInfo to verify changes
  }
  return (
    <div>
      <h1>Create New Event</h1>
      <form className="eventForm">
        {/* date, time, len, street, suite, description, waiters_sum, payment, is_global, has sleep */}
        <Calendar setDate={setDate} />
        <input type="date" disabled value={date} />
        <label htmlFor="start-time">שעת התחלה:</label>
        <input type="time" step={900} id="start-time"/>
        <input type="number" placeholder="length" min={1} />
        <input type="text" placeholder="city" />
        <input type="text" placeholder="street" />
        <input type="text" placeholder="suite" />
        <textarea placeholder="description about the event" />
        <input type="number" placeholder="how much waiters" />
        <br />
        <input type="number" placeholder="payment" />
        <div>
        
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label htmlFor="html">תשלום שעתי</label>
          <input type="radio" id="css" name="fav_language" value="CSS" />
          <label htmlFor="css">שכר גלובלי</label>
        </div>

        <br />
        <div>
          
          <label htmlFor="sleep">כולל שינה</label>
          <input type="checkbox" />
        </div>
      </form>
    </div>
  );
};

export default Newevent;
