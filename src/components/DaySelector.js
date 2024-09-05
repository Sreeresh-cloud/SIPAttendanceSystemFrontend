import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // UseParams to get groupId

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const timeSlots = ['9-10 AM', '10-11 AM', '11-12 PM', '2-3 PM', '3-4 PM'];

const DaySelector = () => {
  const { groupId } = useParams(); // Get groupId from URL params
  const [expandedDays, setExpandedDays] = useState({});
  const navigate = useNavigate();

  const toggleDay = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day] 
    }));
  };

  const handleTimeSlotClick = (day, time) => {
    // Include groupId in the URL when navigating to AttendancePage
    navigate(`/attendance/${groupId}/${day}/${time}`);
  };


  return (
    <div className="day-selector">
      <h1>Select a Day</h1>
      <ul className="list-group">
        {days.map((day) => (
          <li key={day} className="list-group-item">
            <div onClick={() => toggleDay(day)} className="day-header">
              {day}
            </div>

            {/* Conditionally render the timetable with a smooth transition */}
            {expandedDays[day] && (
              <div className="timetable-wrapper" style={{ transition: 'max-height 0.5s ease-in-out', overflow: 'hidden' }}>
                <div className="timetable">
                  {timeSlots.map((time) => (
                    <div key={time} className="time-slot" onClick={() => handleTimeSlotClick(day, time)}>
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DaySelector;