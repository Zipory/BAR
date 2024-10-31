import React from 'react';
import '../style/ManagerDashboard.css'; // Assuming you have a CSS file for styling
import Info from './manager/Info';
import Futureevents from './manager/Futureevents.jsx';
import History from './manager/History.jsx';
const ManagerDashboard = () => {
  return (
    <div className="manager-dashboard">
     <Info/>
  
      {/* Create New Event Button */}
      <button className="big-button" onClick={() => alert('Create New Event')}>
        ליצירת אירוע חדש
      </button>

      {/* Future Events Window */}
        <Futureevents/>

      {/* View History Button */}
      <button className="medium-button" onClick={() => <History/>}>
        היסטורית אירועים
      </button>
    </div>
  );
};

export default ManagerDashboard;
