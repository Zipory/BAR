import React, {useContext} from 'react';
import { userInfo } from "../../App";
const UserInfo = () => {
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const [user, setUser] = useContext(userInfo);
  if (!user) return <p>No user data available.</p>;
  return (
    <div className='container'>
      <h2 className='title'>ברוך הבא</h2>
      <p><strong>שם:</strong> {user.first_name} {user.last_name}</p>
      <p><strong>מייל:</strong> {user.email}</p>
      <p><strong>טלפון:</strong> {user.phone}</p>
      <p><strong>תאריך לידה:</strong> {formatDate(user.birthday)}</p>
      <p><strong>מגדר:</strong> {user.gender}</p>
      <p><strong>ניקוד:</strong> {user.avg_rating ?? 'אין דרוג'}</p>
    </div>
  );
};



export default UserInfo;