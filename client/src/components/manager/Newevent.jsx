import React, { useState } from "react";
import Calendar from "./Calender";
import { FetchPost } from "../Fetch";
import "../../style/new-event.css";
import { GetCity, Getstreet } from "../extra/Getstreet";
import LocatinInputs from "../LocationInputs";

const apiUrl = "http://localhost:4000/events/new-event"

const Newevent = () => {
  const [date, setDate] = useState(new Date());
  const [sendOk, setSendOk] = useState(false);
  const eventInfo = {sleep : false, description : undefined};
  function handleForm(event) {
    const { name, value, type, checked } = event.target;
    // Update the eventInfo object based on input type
    eventInfo[name] = type === "checkbox" ? checked : value;
    eventInfo["date"] = date;
    console.log(eventInfo); // Log the updated eventInfo to verify changes
    // console.log(event.target.name);
    
  }
  function sendForm(e) {
    e.preventDefault();
    eventInfo["street"] = eventInfo["city"] + " " + eventInfo["street"];
    console.log(eventInfo);
    
    FetchPost(apiUrl, eventInfo,);
  }
  return (
    <div>
      <h1>Create New Event</h1>
      <form className="eventForm" onChange={handleForm} onSubmit={sendForm}>
        {/* date, time, len, street, suite, description, waiters_sum, payment, is_global, has sleep */}
        {/* TODO: check that the date dont pass */}
        <Calendar setDate={setDate} />
        <input name="date" type="date" disabled value={date} required />
        <label htmlFor="start-time">שעת התחלה:</label>
        <input name="time" type="time" id="start-time" required />
        <input name="length" type="number" placeholder="length" min={1} step={0.5} disabled required />
        {/* <select name="city" type="select" placeholder="city" required >
        {<GetCity city="בית שמש"/>}
        </select>
        <input name="street" type="text" placeholder="street" required />
        {<Getstreet city={"בית שמש"} street={"יגאל"}/>} */}
        <LocatinInputs />
        <input name="suite" type="text" placeholder="suite" required />
        <textarea name="description" placeholder="description about the event" />
        <input name="waitersSum" type="number" placeholder="how much waiters" required />
        <br />
        <input name="payment" type="number" placeholder="payment" required />
        <div>
          <input
            type="radio"
            id="hourly"
            name="globaly"
            value={false}
            required
          />
          <label htmlFor="html">תשלום שעתי</label>
          <input
            type="radio"
            id="globaly"
            name="globaly"
            value={true}
            required
          />
          <label htmlFor="css">שכר גלובלי</label>
        </div>

        <br />
        <div>
          <label htmlFor="sleep">כולל שינה</label>
          <input name="sleep" type="checkbox" />
        </div>
        <button type="submit">שליחה </button>
      </form>
         
   
    </div>
  );
};

export default Newevent;
