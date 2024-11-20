import React from 'react'
import { FetchPP } from '../Fetch'
import { getToken } from '../entry/CheckToken';

const ReqButton = ({eventID}) => {
   const newReqApi ="http://localhost:4000/requests/new-request";
 const handlePending = () =>{
    let id = {event_id : eventID}
    FetchPP(newReqApi, id, getToken())
 }

  return (
    <h2><button type="button" onClick={handlePending}>+</button></h2>
  )
}

export default ReqButton