import React, {useState, useEffect} from 'react'
import { FetchToken } from '../Fetch';
import { getToken } from '../entry/CheckToken';
import EventDetails from '../EventDetails';
import Event from '../single-event/Event';

/**getting future events that connect to the user. */
const GetMyFutureEvents = () => {
    const [events, setEvents] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    let status = "future";
    /* api to get the future event. */
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
          {isVisible ? 'הסתר' : 'הראה'} אירועים עתידיים
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

export default GetMyFutureEvents