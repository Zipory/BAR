import React, {useState, useEffect, useContext} from 'react'
import { FetchToken } from '../Fetch';
import { getToken } from '../entry/CheckToken';
import EventDetails from '../EventDetails';
import Event from '../single-event/Event';

/** Getting the events that the waiter is pending for. */
const PendingEvents = () => {
    const [events, setEvents] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    let status = "pending";
    /* api to get the pending event. */
    const apiUrl = `http://localhost:4000/events/my-events/${status}`;
    useEffect(() => {
      FetchToken(apiUrl, getToken(), setEvents);
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
      <div>
          {events.map((val, indx) => (
        <li className="li-event" event={val[0]} key={indx}>
          event: <Event eventInfo={val} />
        </li>
      ))}
      </div>
    );
  };

export default PendingEvents