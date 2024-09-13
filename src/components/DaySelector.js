import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DAYS, dateFormatter } from "../helpers";
import './DaySelector.css';
import cc from './images/codingclubtkmce.jpg'; 
import foss from './images/foss-logo.png';

const timeSlots = ["FORENOON", "AFTERNOON"];

const DaySelector = () => {
  const { batchNo } = useParams();
  const [expandedDays, setExpandedDays] = useState({});
  const navigate = useNavigate();

  const toggleDay = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleTimeSlotClick = (day, time) => {
    navigate(`/attendance/${batchNo}/${day}/${time}`);
  };

  return (
    <div className="day-selector">
      <header className="day-selector-header">
        <h1>Select a Day</h1>
      </header>

      <section className="day-selector-content">
        <ul className="list-group">
          {DAYS.map((day) => (
            <li key={day} className="list-group-item">
              <div onClick={() => toggleDay(day)} className="day-header">
                {dateFormatter.format(new Date(day))}
              </div>

              {expandedDays[day] && (
                <div
                  className="timetable-wrapper"
          
                >
                  <div className="timetable">
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="time-slot"
                        onClick={() => handleTimeSlotClick(day, time)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <footer className="day-selector-footer">
        <p>&copy; 2024 TKMCE. All rights reserved.</p>
        <p>Powered by</p>
        <div className="footer-logos">
          <a href="https://www.instagram.com/codingclub_tkmce?igsh=OTZjaHBqdDBnNXE2" target="_blank" rel="noopener noreferrer">
            <img src={cc} alt="Coding Club TKMCE Logo" className="footer-logo cc-logo" />
          </a>
          <a href="https://www.instagram.com/tkmcefosscell?igsh=ZTlreWpsemF0eXN3" target="_blank" rel="noopener noreferrer">
            <img src={foss} alt="FOSS TKMCE Logo" className="footer-logo foss-logo" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default DaySelector;
