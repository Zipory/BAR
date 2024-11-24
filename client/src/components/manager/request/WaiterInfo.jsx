import React from "react";

const WaiterInfo = ({info}) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  return (
    <div>
      <p>
        <strong>שם:</strong> {info.first_name} {info.last_name}
      </p>
      <p>
        <strong>מייל:</strong> {info.email}
      </p>
      <p>
        <strong>טלפון:</strong> {info.phone}
      </p>
      <p>
        <strong>תאריך לידה:</strong> {formatDate(info.birthday)}
      </p>
      <p>
        <strong>מגדר:</strong> {info.gender}
      </p>
      <p>
        <strong>ניקוד:</strong> {info.avg_rating ?? "אין דרוג"}
      </p>
    </div>
  );
};

export default WaiterInfo;
