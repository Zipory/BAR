import React from 'react'
import { FetchDD, FetchDelete } from '../Fetch'
import { getToken } from '../entry/CheckToken';
const DeleteButton = ({id}) => {
    const urlDelete = "http://localhost:4000/events/delete-event";
  return (
    <button
    onClick={() =>
      FetchDD(urlDelete, {event_id: id}, getToken())
    }>מחיקה</button>
  )
}

export default DeleteButton