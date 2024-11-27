import React, { useState, useEffect } from "react";

const CitySelector = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([]);

  const resourceCityID = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
  let cityUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceCityID}`;
  useEffect(() => {
    fetch(cityUrl)
      .then((response) => response.json())
      .then((data) => {
        let res = [...data.result.records];
        setOptions(() => res.map((item) => item["שם_ישוב"]));
      });
  }, []);

  // Update input and filter options
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const newFilteredOptions = options.filter((option) =>
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
    setInputValue(option); // Set input to the selected option
    setShowDropdown(false); // Hide dropdown
    props.setCity(option);
    props.eventInfo.city = option;
  };

  return (
    <div style={{ position: "relative", width: "200px" }}>
      <input
        type="text"
        value={inputValue}
        name="city"
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(filteredOptions.length > 0)}
        placeholder="חפש שם העיר"
        required
      />

      {showDropdown && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            listStyle: "none",
            margin: 0,
            padding: "5px 0",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: "5px",
                cursor: "pointer",
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
