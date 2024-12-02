import React, {useState, useEffect} from 'react'
import { FetchToken } from '../Fetch';
import Event from '../single-event/Event';
import ToggledComponent from './ToggledComponent';

/**getting future events of all users. */
const GetAllFutureEvents = ({isVisible, events}) => {
    // const [events, setEvents] = useState([]);
    // const [isVisible, setIsVisible] = useState(false);
    /* api to get all events event. */
    // const apiUrl = "http://localhost:4000/events";
    // useEffect(() => {
    //   FetchToken(apiUrl, setEvents);
    // }, []);

    // const toggleVisibility = () => {
    //   setIsVisible((prevState) => !prevState);
    // };
  
    return (
      <div >
        {/* <button onClick={toggleVisibility} >
          {isVisible ? 'הסתר' : 'הראה'} אירועים כלליים
        </button> */}
        {isVisible && <ToggledComponent events={events}/>}
      </div>
    );
  };
  
  // const ToggledComponent = ({events}) => {
  //   return (
  //     <ol>
  //         {events.map((val, indx) => (
  //       <li className="li-event" event={val[0]} key={indx}>
  //         <Event eventInfo={val}/>
  //       </li>
  //     ))}
  //     </ol>
  //   );
  // };

export default GetAllFutureEvents