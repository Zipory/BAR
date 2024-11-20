import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./waiter/info";
import Allevents from "./waiter/Allevents";
// import Futureevents from "./waiter/FutureeEvent";
import FutureEvents from "./waiter/FutureEvents"
import Pastevents from "./waiter/Pastevents";
import PendingEvents from "./waiter/pendingEvents";
import "../style/waiterDashboard.css"

const WaiterDashboard = () => {
  let isAwaiter2 =JSON.parse( window.localStorage.getItem("isWaiter"));
  const navigate = useNavigate();
  useEffect(() => {
 if (!isAwaiter2) {
    console.log("not a waiter");
    navigate("/home");
  }
  }, []);
 
  return (
    <div>
      <h2><UserInfo/></h2>
      <section>אירועים עתידיים כלליים:
        <Allevents/>
      </section>
      {/* <section>אירועים עתידיים פרטיים:
        <Futureevents/>
      </section> */}
      <section>
        {/* <Pastevents/>
        <PendingEvents/>
       */}
         {/* <FutureEvents/> */}
      </section>
    </div>
  );
};

export default WaiterDashboard;
