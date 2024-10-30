import React from "react";
import "../../style/HomePage.css";
const employer = require("../../images/employer.png");
const EmployersEntry = () => {
  return (
    <div className="Employers entry left">
      <h1 className="subject" onClick={() => {}}>
        כניסת מעסיקים
      </h1>
      <img src={employer} alt="employer image" onClick={() => {}} />
      <p className="waiters-register-p" onClick={() => {}}>
        לא רשום? הירשם עכשיו!
      </p>
    </div>
  );
};

export default EmployersEntry;
