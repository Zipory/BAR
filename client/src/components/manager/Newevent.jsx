import React, { useState } from "react";
import Calendar from "./Calender";
import { Fetch } from "../Fetch";
const Newevent = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <h1>Create New Event</h1>
      <form>
        {/* date, time, len, street, suite, description, waiters_sum, payment, is_global, has sleep */}
        <Calendar setDate={setDate} />
        <input type="date" disabled value={date} />
        <input type="time" step={900} />
        <input type="number" placeholder="length" min={1} />
        <input type="text" placeholder="city" />
        <input type="text" placeholder="street" />
        <input type="tel" placeholder="suite" />
        <textarea placeholder="description about the event" />
        <input type="number" placeholder="how much waiters" />
        <br/>
        <input type="number" placeholder="payment" />
        <input type="radio" id="html" name="fav_language" value="HTML" />
        <label for="html">תשלום שעתי</label>
        <input type="radio" id="css" name="fav_language" value="CSS" />
        <label for="css">שכר גלובלי</label>
        <br/>
        <label htmlFor="sleep">כולל שינה</label>
        <input type="checkbox"/>
      </form>
    </div>
  );
};

export default Newevent;
