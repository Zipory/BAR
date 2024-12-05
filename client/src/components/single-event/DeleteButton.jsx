import React from 'react'
import { FetchDD} from '../Fetch'
const DeleteButton = ({eventID}) => {
    const urlDelete = `/events/delete-event`;
    let id = {event_id : eventID}
  return (
    <button
    className='log-out'
    onDoubleClick={() =>
      FetchDD(urlDelete, id)
    }>ביטול האירוע <small>(לחיצה כפולה)</small></button>
  )
}

export default DeleteButton