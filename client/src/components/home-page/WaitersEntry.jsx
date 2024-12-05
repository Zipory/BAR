import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { typeOfUser } from "../../App";

const waiter = require("../../images/waiter.png");
const WaitersEntry = () => {
  const [isAwaiter, setIsAwaiter] = useContext(typeOfUser);

  return (
    <div
      className="waiters entry right"
      onClick={() => {
        setIsAwaiter(true);
      }}>
      <Link to={"/login"} style={{ textDecoration: "none", color: "inherit" }}>
        <h1 className="subject"><span className="logo">BAR</span> למלצרים</h1>
      </Link>
      <Link to={"/login"}>
        <img src={waiter} alt="waiter " />
      </Link>
      <p className="waiters-register-p">
        <Link
          to={"/register"}
          style={{ textDecoration: "none", color: "inherit"  }}>
          לא רשום? הירשם עכשיו!
        </Link>
      </p>
    </div>
  );
};

export default WaitersEntry;
