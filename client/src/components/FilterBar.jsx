import React, { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  // State למסננים
  const [city, setCity] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [workHours, setWorkHours] = useState("");

  // עדכון ערכי המסננים ושליחת שינוי למרכיב האב
  const handleFilterChange = () => {
    onFilterChange({ city, minAmount, workHours });
  };

  return (
    <div className="filter-bar">
      <h3>סנן חיפושים</h3>
      {/* בחירת עיר */}
      <div className="filter-item">
        <label>עיר:</label>
        <input
          type="text"
          placeholder="הקלד עיר"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* מעל סכום מסוים */}
      <div className="filter-item">
        <label>מעל סכום:</label>
        <input
          type="number"
          placeholder="הכנס סכום"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
      </div>

      {/* בחירת שעות עבודה */}
      <div className="filter-item">
        {/* <label>שעות עבודה:</label>
        <select
          value={workHours}
          onChange={(e) => setWorkHours(e.target.value)}>
          <option value="">בחר שעות</option>
          <option value="morning">בוקר (8:00-12:00)</option>
          <option value="afternoon">צהריים (12:00-16:00)</option>
          <option value="evening">ערב (16:00-20:00)</option>
          <option value="night">לילה (20:00-00:00)</option>
        </select> */}
      </div>

      {/* כפתור לסינון */}
      <button onClick={handleFilterChange}>סנן</button>
    </div>
  );
};

export default FilterBar;
