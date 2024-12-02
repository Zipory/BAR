import React, {useState, useEffect, useContext} from 'react'
import { FetchToken } from '../Fetch';
import Event from '../single-event/Event';

/** Getting the events that the waiter is pending for. */
const PendingEvents = () => {
    const [events, setEvents] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    let status = "pending";
    /* api to get the pending event. */
    const apiUrl = `http://localhost:4000/events/my-events/${status}`;
    useEffect(() => {
      FetchToken(apiUrl, setEvents);
    }, []);

    const toggleVisibility = () => {
      setIsVisible((prevState) => !prevState);
    };
  
    return (
      <div >
        <button onClick={toggleVisibility} >
          {isVisible ? 'הסתר' : 'הראה'} אירועים בהמתנה
        </button>
        {isVisible && <ToggledComponent events={events}/>}
      </div>
    );
  };
  
  const ToggledComponent = ({events}) => {
    return (
      <ol>
          {events.map((val, indx) => (
        <li className="li-event" event={val[0]} key={indx}>
          event: <Event eventInfo={val} />
        </li>
      ))}
      </ol>
    );
  };

export default PendingEvents