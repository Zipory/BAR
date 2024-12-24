import "../../style/new-event.css";
import React, { useState, useContext } from "react";
import Calendar from "./Calender";
import { FetchNewEvent, FetchPut } from "../Fetch";
import LocatinInputs from "../LocationInputs";
import { userInfo } from "../../App";
const Newevent = ({ setShowModal, eventStatus, setFutureEventsIsVisible }) => {
  const apiUrl = `/events/new-event`;
  const urlEdit = `/events/update-event`;
  const [user, setUser] = useContext(userInfo);
  const [date, setDate] = useState(new Date());
  const [sendOk, setSendOk] = useState(false);
  const eventInfo = { has_sleep: false, description: undefined };
  function handleForm(event) {
    const { name, value, type, checked } = event.target;
    // Update the eventInfo object based on input type
    console.log(eventInfo);

    eventInfo[name] = type === "checkbox" ? checked : value;
    eventInfo["date"] = date;
    // change the value from string to boolean.
    if (name == "is_global") {
      eventInfo[name] = value === "true" ? true : false;
    }
  }
  async function sendForm(e) {
    e.preventDefault();
    eventInfo["location"] = eventInfo["city"] + " " + eventInfo["street"];
    // console.log(eventInfo);
    if (eventStatus === "new-event") {
      FetchNewEvent(apiUrl, eventInfo, setSendOk).then(() => {
        setShowModal(false);
        setFutureEventsIsVisible(true);
      });
    }
    if (eventStatus === "update-event") {
      // TODO:  need to continue.
      // FetchPut(urlEdit, undefined, undefined);
    }
  }
  return (
    <div className="overlayStyle">
      {/* <button onClick={setShowModal(false)}>X</button> */}
      <form
        className="eventForm modalStyle"
        onInput={handleForm}
        onSubmit={sendForm}>
        <h1>יצירת אירוע חדש</h1>
        <Calendar setDate={setDate} />
        <input
          name="date"
          type="date"
          disabled
          value={date}
          required
          placeholder="בחר תאריך"
        />
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
        <LocatinInputs eventInfo={eventInfo} />
        <input name="suite" type="text" placeholder="מספר בית" required />
        <textarea name="description" placeholder="תאור קצר על האירוע" />
        <input
          name="waiters_amount"
          type="number"
          placeholder="כמות מלצרים"
          min={1}
          required
        />
        <br />
        <input
          name="salary"
          type="number"
          placeholder="סכום לתשלום"
          min={1}
          required
        />
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
