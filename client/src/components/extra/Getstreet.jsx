import React, { useState, useEffect } from "react";

const limit = 10;
const resourceStreetID = "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3";
let streetUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceStreetID}`;

const resourceCityID = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
let cityUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceCityID}`;

export const GetCity = ({ city }) => {
  const [cityData, setCityData] = useState([]);

 
  useEffect(() => {
    if (city.length > 0) {
      cityUrl += `&q=%20${city}`;
      fetch(cityUrl + `&limit=${limit}`)
        .then((response) => response.json())
        .then((data) => {
          //   console.log(17, data.result);
          setCityData(data.result.records);
        });
    }
  }, [city]);
  return <>{cityData?.map((city) => <optin>{city["שם_ישוב"]}</optin>)}</>;
};

export const Getstreet = ({ city, street }) => {
    const [streetData, setStreetDate] = useState([]);
    useEffect(() => {
        if (city.length > 0) {
    streetUrl += `&q=%20${street} ${city}`;
    fetch(streetUrl + `&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(34, data.result);
        setStreetDate(data.result.records)
       
      });
        }
    }, [street]); 
      return <div>{streetData?.map((city) => <li>{city["שם_רחוב"]}</li>)}</div>;
    return <div></div>;
  }     
