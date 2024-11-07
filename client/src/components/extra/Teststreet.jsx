import React, { useState, useEffect } from 'react';

const CitySelector = () => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState("");
  const resourceStreetID = "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3";
  let streetUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceStreetID}&q=${city}`;
   useEffect(() => {
  fetch(streetUrl ).then((response) => response.json())
  .then((data) => {
    let res = [...data.result.records];
    console.log(res);    
    setOptions(()=>(res.map((item) => item["שם_רחוב"])));
    
});
}, []);

  // Update input and filter options
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    console.log(value);
    
    if (value) {
      const newFilteredOptions = options.filter(option => 
        option.includes(value)
      );
      setFilteredOptions(newFilteredOptions);
      setShowDropdown(newFilteredOptions.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setInputValue(option);  // Set input to the selected option
    setShowDropdown(false); // Hide dropdown
  };

  let noCity = (city.length) < 1;

  return (
    <div style={{ position: 'relative', width: '200px' }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(filteredOptions.length > 0)}
        placeholder="Search for a street..."
        disabled={noCity}
      />

      {showDropdown && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          listStyle: 'none',
          margin: 0,
          padding: '5px 0',
          maxHeight: '150px',
          overflowY: 'auto'
        }}>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: '5px',
                cursor: 'pointer'
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySelector;
