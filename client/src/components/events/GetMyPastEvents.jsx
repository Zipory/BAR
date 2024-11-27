import React, {useState, useEffect} from 'react'
import { FetchToken } from '../Fetch';
import { getToken } from '../entry/CheckToken';
import Event from '../single-event/Event';

/**getting past events that connect to the user. */
const GetMyPastEvents = () => {
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
      <ol>
          {events.map((val, indx) => (
        <li className="li-event" event={val[0]} key={indx}>
          <Event eventInfo={val}/>
        </li>
      ))}
      </ol>
    );
  };

export default GetMyPastEvents