import React from 'react'
import Event from '../single-event/Event';

const ToggledComponent = ({events}) => {
    return (
      <ol>
          {events.map((val, indx) => (
        <li className="li-event" event={val[0]} key={indx}>
          <Event eventInfo={val}/>
        </li>
      ))}
      </ol>
    );
  };

export default ToggledComponent