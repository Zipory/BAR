import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import "../../style/calander.css"
function Calendar({setDate}) {
  const [events, setEvents] = useState([]);

  // Function to handle adding a holiday
  const addHoliday = () => {
    const holiday = {
      title: 'Holiday',
      start: new Date(),  // Start today
      allDay: true
    };
    setEvents([...events, holiday]);
   
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}  // Display events
        selectable={true}  // Allow date selection
        dateClick={(info) =>  setDate(info.dateStr)}  // Example interaction
      />
    </div>
  );
}
export default Calendar;