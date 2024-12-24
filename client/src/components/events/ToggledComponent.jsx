import React from "react";
import Event from "../single-event/Event";
import { FetchToken } from "../Fetch";
import { useState, useEffect, useRef } from "react";
import FilterBar from "../FilterBar";

const ToggledComponent = ({
  events,
  appendButton,
  title,
  setSomeChange,
  timeToRate,
}) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [cityFilter, setCityFilter] = useState(null);
  const [salaryFilter, setSalaryFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [workLengthFilter, setWorkLengthFilter] = useState(null);
  const [requestList, setRequestList] = useState([]);
  const [increment, setIncrement] = useState(0);

  useEffect(() => {
    FetchToken("/requests/all-requests", setRequestList);
  }, [increment]);

  return (
    <>
      <style>
        {`
          .filter-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }

          .filter-container input,
          .filter-container button {
            padding: 8px 12px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 1rem;
            max-width: 150px;
            transition: all 0.3s ease;
          }

          .filter-container input[type="text"],
          .filter-container input[type="number"] {
            background-color: #f9f9f9;
          }

          .filter-container input[type="text"]:focus,
          .filter-container input[type="number"]:focus {
            background-color: #e6f7ff;
            border-color: #66b3ff;
            outline: none;
          }

          .filter-container button {
            background-color: #66b3ff;
            color: #fff;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            border: none;
            max-width: 120px;
          }

          .filter-container button:hover {
            background-color: #3399ff;
          }

          .filter-container button:disabled {
            background-color: #ddd;
            cursor: not-allowed;
          }

          .filter-container input[type="text"],
          .filter-container input[type="number"] {
            font-size: 0.9rem;
          }

          .filter-container .buttons {
            display: flex;
            gap: 10px;
            width: 100%;
          }

          .filter-container .buttons button {
            width: 100%;
          }

          @media (max-width: 768px) {
            .filter-container {
              flex-direction: column;
            }
            .filter-container input,
            .filter-container button {
              width: 100%;
            }
          }
        `}
      </style>

      {title && <h2 className="events-title">{title}</h2>}

      {title === "אירועים כלליים" ? (
        <>
          <div className="filter-container">
            <input
              type="text"
              placeholder="סנן לפי עיר"
              onChange={(e) => setCityFilter(e.target.value)}
            />
            <input
              type="number"
              onChange={(e) => setSalaryFilter(e.target.value)}
              placeholder="סנן לפי משכורת"
              min={1}
            />

            <input
              type="date"
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <div className="filter-container buttons">
            <button
              onClick={() => {
                const matchesCity = (event) => {
                  if (!cityFilter) return true;
                  return (
                    event.location &&
                    event.location
                      .toLowerCase()
                      .includes(cityFilter.toLowerCase())
                  );
                };

                const matchesSalary = (event) => {
                  if (!salaryFilter) return true;
                  const salary = parseFloat(event.salary);
                  return !isNaN(salary) && salary >= parseFloat(salaryFilter);
                };

                const matchesDate = (event) => {
                  if (!dateFilter) return true;
                  // ודא שהפורמט של התאריך זהה
                  return (
                    new Date(event.e_date).toISOString().split("T")[0] ===
                    dateFilter
                  );
                };

                if (!cityFilter && !salaryFilter && !dateFilter) {
                  setFilteredEvents(events); // אין פילטרים, הצגת כל האירועים
                } else {
                  const filtered = events.filter(
                    (event) =>
                      matchesCity(event) &&
                      matchesSalary(event) &&
                      matchesDate(event)
                  );
                  setFilteredEvents(filtered);
                }
              }}>
              סנן🔍
            </button>

            <button onClick={() => setFilteredEvents(events)}>הכול📃</button>
          </div>
        </>
      ) : (
        ""
      )}
      <ol>
        {filteredEvents.length === 0 && <h3>לא נמצאו אירועים</h3>}
        {filteredEvents.map((val, indx) => (
          <li className="li-event" event={val[0]} key={indx}>
            <Event
              eventInfo={val}
              appendButton={appendButton}
              requestList={requestList}
              setSomeChange={setSomeChange}
              timeToRate={timeToRate}
              toSetRequests={[increment, setIncrement]}
            />
          </li>
        ))}
      </ol>
    </>
  );
};

export default ToggledComponent;
