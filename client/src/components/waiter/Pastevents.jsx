import React, {useState, useEffect, useContext} from 'react'
import { FetchToken } from '../Fetch';
import { getToken } from '../entry/CheckToken';
import EventDetails from '../EventDetails';

const Pastevents = () => {
    const [events, setEvents] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    let status = "past";
    /* api to get the past event. */
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
          {isVisible ? 'הסתר' : 'הראה'} אירועים שעברו
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
          event: <EventDetails eventInfo={val} />
        </li>
      ))}
      </div>
    );
  };

export default Pastevents