import React, { useContext, useState } from 'react'
import { userInfo } from '../../App'
const Futureevents = () => {
  const [user, setUser] = useContext(userInfo);
  const [events, setEvents] = useState([user.events]);
  return (
    <div className="future-events">
    <h3>אירועים עתידים:</h3>
    <ul>
      <li> אירוע 1: בית הנשיא ירושלים - 12/03/25  == 4/5 מלצרים</li>
      <li>אירוע 2: כיכר החתולות ירושלים - 16/03/25  == 3/3 מלצרים</li>
      <li>אירוע 3: רמדה רנסאנס ירושלים - 01/04/25  == 2/10 מלצרים</li>
      {/* <progress value="37" max="100"></progress> */}
      {/* <meter value="10" max="100">100%</meter> */}
      {/* {events.map((event, index) => (
        <li>אירוע {index+1}: {event.city} - {event.date} == {event.numberOfWaitersNeeded}/{event.numberOfWaiters}</li>
      ))} */}
    </ul>
  </div>
  )
}

export default Futureevents;