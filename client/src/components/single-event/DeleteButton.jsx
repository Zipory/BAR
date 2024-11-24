import React from 'react'
import { FetchDD, FetchDelete } from '../Fetch'
import { getToken } from '../entry/CheckToken';
const DeleteButton = ({eventID}) => {
    const urlDelete = "http://localhost:4000/events/delete-event";
    let id = {event_id : eventID}
  return (
    <button
    onClick={() =>
      FetchDD(urlDelete, id, getToken())
    }>מחיקה</button>
  )
}

export default DeleteButton