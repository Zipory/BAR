import React from 'react'
import { FetchDD} from '../Fetch'
const DeleteButton = ({eventID}) => {
    const urlDelete = "http://localhost:4000/events/delete-event";
    let id = {event_id : eventID}
  return (
    <button
    onClick={() =>
      FetchDD(urlDelete, id)
    }>מחיקה</button>
  )
}

export default DeleteButton