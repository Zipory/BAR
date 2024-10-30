import React from "react";
const waiter = require("../../images/waiter.png");
const WaitersEntry = () => {
  return (
    <div className="waiters entry right">
      <h1 className="subject" onClick={() => {}}>
        כניסת מלצרים
      </h1>
      <img src={waiter} alt="waiter image" onClick={() => {}} />
      <p className="waiters-register-p" onClick={() => {}}>
        לא רשום? הירשם עכשיו!
      </p>
    </div>
  );
};

export default WaitersEntry;
