import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../style/HomePage.css";
import { typeOfUser } from "../../App";
const employer = require("../../images/employer.png");
const EmployersEntry = () => {
  // const [employerEntry, setEmployerEntry] = useState(false);
  // // const [waiterEntry, setWaiterEntry] = useState(false);
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);

  return (
    <div className="Employers entry left"  onClick={() => {
      setIsAwaiter(false);
    }}>
      <Link to={"/login"} style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="subject">כניסת מעסיקים</h1>
      </Link>
      <Link to={"/login"}>
        <img
          src={employer}
          alt="employer "
        />
      </Link>

      <p
        className="waiters-register-p"
        onClick={() => {
          setIsAwaiter(false);
        }}>
        <Link
          to={"/register"}
          style={{ textDecoration: "none", color: "inherit" }}>
          לא רשום? הירשם עכשיו!
        </Link>
      </p>
    </div>
  );
};

export default EmployersEntry;
