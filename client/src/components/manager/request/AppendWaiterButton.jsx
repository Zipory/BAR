import React from 'react'
import { FetchPP } from '../../Fetch'
import { getToken } from '../../entry/CheckToken';

const AppendWaiterButton = ({eventID, waiterID}) => {
   const approveApi ="http://localhost:4000/requests/approve-request";
 const handlePending = () =>{
    let ids = {event_id : eventID, waiter_id : waiterID}
    FetchPP(approveApi, ids, getToken())
 }

  return (
    <h2><button type="button" onClick={handlePending}>אשר מלצר זה</button></h2>
  )
}

export default AppendWaiterButton;