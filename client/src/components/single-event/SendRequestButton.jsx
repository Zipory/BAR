import React from 'react'
import { FetchPP } from '../Fetch'

const SendRequestButton = ({eventID}) => {
   const newReqApi ="http://localhost:4000/requests/new-request";
 const handlePending = () =>{
    let id = {event_id : eventID}
    FetchPP(newReqApi, id)
 }

  return (
    <h2><button type="button" onClick={handlePending}>+</button></h2>
  )
}

export default SendRequestButton