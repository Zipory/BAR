import React, { useContext } from 'react'
import { userInfo } from '../../App'
const Info = () => {
  const [user, setUser] = useContext(userInfo);
  return (
     <div className="manager-info">
     <h2>ברוך הבא המנהל {user.name}</h2>
     <p>קייטרינג: {user.catering}</p>
     <p>Email: {user.email}</p>
   </div>
  )
}

export default Info