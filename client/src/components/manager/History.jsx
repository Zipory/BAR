import React from 'react'
import EventDetails from "../EventDetails";

const History = (props) => {
  return (
    <div>
      {props.history.map((val, indx) => (
        <li className="li-event" event={val[0]} key={indx}>
          אירוע {indx+1}:<EventDetails eventInfo={val} />
        </li>
      ))}
    </div>
  )
}

export default History;