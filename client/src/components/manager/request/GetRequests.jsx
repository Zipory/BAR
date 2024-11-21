import React, {useState} from 'react'

const GetRequests = ({ eventID }) => {
    const [requests, setRequests] = useState([]);
    let status = "pending";
    let id = { event_id: eventID };
    const getReqApi = `http://localhost:4000/requests/get-request/${status}/${id}`
    function handleGetReq() {
        console.log("in progress...");
        
    }
  return (
    <button onClick={handleGetReq}>הראה בקשות הצטרפות</button>
  )
}

export default GetRequests