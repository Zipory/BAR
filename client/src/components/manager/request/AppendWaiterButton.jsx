import React from 'react'
import { FetchPP } from '../../Fetch'
const AppendWaiterButton = ({eventID, waiterID}) => {
   const approveApi =`/requests/approve-request`;
 const handlePending = () =>{
    let ids = {event_id : eventID, waiter_id : waiterID}
    FetchPP(approveApi, ids)
 }

  return (
    <h2><button type="button" onClick={handlePending}>אשר מלצר זה</button></h2>
  )
}

export default AppendWaiterButton;