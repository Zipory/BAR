import React from "react";
const waiter = require("../../images/waiter.png");
const WaitersEntry = () => {
  return (
    <div className="waiters entry right">
      <h1 className="subject">כניסת מלצרים</h1>
      <img src={waiter} alt="waiter image" />
      <p className="waiters-register-p">לא רשום? הירשם עכשיו!</p>
    </div>
  );
};

export default WaitersEntry;
