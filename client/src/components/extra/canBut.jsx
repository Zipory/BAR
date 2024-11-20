import React from 'react'
import { FetchPP } from '../Fetch'
import { getToken } from '../entry/CheckToken';

const canBut = ({eventID}) => {
    const newReqApi ="http://localhost:4000/requests/cancel-request";
 const handleCancel = () =>{
    let id = {event_id : eventID}
    FetchPP(newReqApi, id, getToken())
 }

  return (
    <h2><button type="button" onClick={handleCancel}>בטל זימון</button></h2>
  )
}

export default canBut