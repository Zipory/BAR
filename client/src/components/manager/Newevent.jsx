import React, { useState, useContext } from "react";
import Calendar from "./Calender";
import { FetchNewEvent, FetchPut } from "../Fetch";
import "../../style/new-event.css";
import { GetCity, Getstreet } from "../extra/Getstreet";
import LocatinInputs from "../LocationInputs";
import { userInfo } from "../../App";
import { getToken } from "../entry/CheckToken";
const Newevent = ({ setShowModal, eventStatus }) => {
  const apiUrl = `http://localhost:4000/events/${eventStatus}`;
  const urlEdit = "http://localhost:4000/events/update-event";
  const [user, setUser] = useContext(userInfo);
  const [date, setDate] = useState(new Date());
  const [sendOk, setSendOk] = useState(false);
  const eventInfo = { has_sleep: false, description: undefined };
  function handleForm(event) {
    const { name, value, type, checked } = event.target;
    // Update the eventInfo object based on input type
    eventInfo[name] = type === "checkbox" ? checked : value;
    eventInfo["date"] = date;
    // change the value from string to boolean.
    if (name == "is_global") {
      eventInfo[name] = value === "true" ? true : false;
    }
    // console.log(eventInfo); // Log the updated eventInfo to verify changes
    // console.log(event.target.name);
  }
  async function sendForm(e) {
    e.preventDefault();
    eventInfo["location"] = eventInfo["city"] + " " + eventInfo["street"];
    // console.log(eventInfo);
    if (eventStatus === "new-event") {
      FetchNewEvent(apiUrl, eventInfo, setSendOk, user["email"], getToken()).then(() =>
        setShowModal(false)
      );
    }
    if (eventStatus === "update-event") {
      FetchPut(urlEdit, undefined, undefined, user.email, getToken());
    }
  }
  return (
    <div className="overlayStyle">
      <h1>Create New Event</h1>
      <form
        className="eventForm modalStyle"
        onChange={handleForm}
        onSubmit={sendForm}
      >
        <Calendar setDate={setDate} />
        <input name="date" type="date" disabled value={date} required />
        <label htmlFor="start-time">שעת התחלה:</label>
        <input name="time" type="time" id="start-time" required />
        <input
          name="e_duration"
          type="number"
          placeholder="משך האירוע"
          min={1}
          step={0.5}
          required
        />
        <LocatinInputs />
        <input name="suite" type="text" placeholder="מספר בית" required />
        <textarea
          name="description"
          placeholder="description about the event"
        />
        <input
          name="waiters_amount"
          type="number"
          placeholder="כמות מלצרים"
          required
        />
        <br />
        <input name="salary" type="number" placeholder="payment" required />
        <div>
          <input
            type="radio"
            id="hourly"
            name="is_global"
            value={false}
            required
          />
          <label htmlFor="is_global">תשלום שעתי</label>
          <input
            type="radio"
            id="globaly"
            name="is_global"
            value={true}
            required
          />
          <label htmlFor="is_global">שכר גלובלי</label>
        </div>

        <br />
        <div>
          <label htmlFor="has_sleep">כולל שינה</label>
          <input name="has_sleep" type="checkbox" />
        </div>
        <button type="submit">שליחה </button>
      </form>
    </div>
  );
};

export default Newevent;
