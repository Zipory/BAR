import React from 'react'

const History = (props) => {
  return (
    <div>
        {props.history.map((event, index) => (
            <li>אירוע {index+1}: {event.city} - {event.date} </li>
        ))}
        <h1>סה"כ מלצרים: </h1>
    </div>
  )
}

export default History;