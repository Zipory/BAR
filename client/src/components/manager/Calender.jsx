import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import heLocale from '@fullcalendar/core/locales/he';
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
        locales={[heLocale]}  // Add the Hebrew locale
        locale='he'  // Set the calendar to use Hebrew
        // headerToolbar={{
        //   left: 'prev,next today',
        //   center: 'title',
        //   right: 'dayGridMonth,timeGridWeek,timeGridDay'
        // }}
        Responsive breakpoints
        windowResize={(arg) => {
          if (arg.view.type === 'dayGridMonth' && window.innerWidth < 768) {
            arg.view.calendar.changeView('timeGridDay');
          }
        }}
      />
    </div>
  );
}
export default Calendar;