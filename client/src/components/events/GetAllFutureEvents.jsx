import React, {useState, useEffect} from 'react'
import { FetchToken } from '../Fetch';
import { getToken } from '../entry/CheckToken';
import EventDetails from '../EventDetails';
import Event from '../single-event/Event';

/**getting future events of all users. */
const GetAllFutureEvents = () => {
    const [events, setEvents] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    /* api to get all events event. */
    const apiUrl = "http://localhost:4000/events";
    useEffect(() => {
      FetchToken(apiUrl, getToken(), setEvents);
    }, []);

    const toggleVisibility = () => {
      setIsVisible((prevState) => !prevState);
    };
  
    return (
      <div >
        <button onClick={toggleVisibility} >
          {isVisible ? 'הסתר' : 'הראה'} אירועים כלליים
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
          {/* <Event eventInfo={val}/> */}
        </li>
      ))}
      </div>
    );
  };

export default GetAllFutureEvents