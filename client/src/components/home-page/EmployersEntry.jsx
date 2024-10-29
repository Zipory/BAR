import React from "react";
const employer = require("../../images/employer.png");
const EmployersEntry = () => {
  return (
    <div className="Employers entry left">
      <h1 className="subject">כניסת מעסיקים</h1>
      <img src={employer} alt="employer image" />
      <p className="waiters-register-p">לא רשום? הירשם עכשיו!</p>
    </div>
  );
};

export default EmployersEntry;
