import React, {useState} from "react";
import Getcity from "./location/Getcity";
import Getstreet from "./location/Getstreet";
const LocatinInputs = (props) => {
    const [city, setCity] = useState("");
    return (
        <div>
            <Getcity setCity={setCity} eventInfo={props.eventInfo}/>
            <Getstreet city={city}  eventInfo={props.eventInfo}/>
        </div>
    )
};

export default LocatinInputs;