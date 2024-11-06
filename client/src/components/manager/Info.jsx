import React, { useContext } from 'react'
import { userInfo } from '../../App'
const Info = () => {
  const [user, setUser] = useContext(userInfo);
  return (
     <div className="manager-info">
     <h2>ברוך הבא המנהל {user["manager"]}</h2>
     <p>קייטרינג: {user["company_name"]}</p>
     <p>מייל: {user["email"]}</p>
     <p>פלא': {user["manager_phone"]}</p>
     <p>דירוג: {user["avg_rating"]}</p>
   </div>
  )
}

export default Info