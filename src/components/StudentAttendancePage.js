import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./StudentAttendancePage.css";
import axios from "../http-client";
import { DAYS, dateFormatter } from "../helpers";
import cc from "./images/codingclubtkmce.jpg";
import foss from "./images/foss-logo.png";

const calculateAttendanceStats = (attendanceData) => {
  let totalSessions = 0;
  let attendedSessions = 0;

  for (const dayData of attendanceData) {
    const daySessions = (dayData.fnAttendance ? 1 : 0) + (dayData.anAttendance ? 1 : 0);
    totalSessions += 2;
    attendedSessions += daySessions;
  }

  const attendancePercentage = ((attendedSessions / totalSessions) * 100).toFixed(2);

  return {
    attendancePercentage,
    sessionsAttended: attendedSessions,
    totalSessions,
  };
};

const StudentAttendancePage = () => {
  const { id: studentId } = useParams();
  const [studentData, setStudentData] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [oldData, setOldData] = useState([]); // New state for tracking original data
  const [hasMountedData, setHasMountedData] = useState(false);
  const [hasMountedAttendanceData, setHasMountedAttendanceData] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    try {
      async function getStudentData() {
        try {
          const response = await axios.get(`student/${studentId}`);
          const studentData = response.data;
          setHasMountedData(true);
          setStudentData(studentData);
          if (studentData == null) return;

          const attendanceData = await Promise.all(
            DAYS.map(async (date) => {
              const response = await axios.get(`${studentId}/${date}`);
              if (response.data == null) return;
              return {
                date,
                fnAttendance: response.data.fnAttendance ?? true,
                anAttendance: response.data.anAttendance ?? true,
              };
            })
          );

          setAttendanceData(attendanceData);
          setOldData(attendanceData); // Set initial old data
          setHasMountedAttendanceData(true);
        } catch (error) {
          console.error(error);
        }
      }
      if (!hasMountedData) getStudentData();
    } catch (error) {
      console.error(error);
    }
  }, [studentId, hasMountedData, attendanceData]);

  const toggleAttendance = (date, session) => {
    setAttendanceData((prevData) =>
      prevData.map((dayData) => {
        if (dayData.date === date) {
          return {
            ...dayData,
            [session]: !dayData[session],
          };
        }
        return dayData;
      })
    );
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const updatedAttendance = attendanceData.filter(dayData => {
        const oldDayData = oldData.find(od => od.date === dayData.date);
        return (
          !oldDayData ||
          oldDayData.fnAttendance !== dayData.fnAttendance ||
          oldDayData.anAttendance !== dayData.anAttendance
        );
      });
  
      if (updatedAttendance.length > 0) {
        const updatePayload = updatedAttendance.map(dayData => ({
          studentId,
          date: dayData.date,
          fnAttendance: dayData.fnAttendance,
          anAttendance: dayData.anAttendance,
        }));
  
        await axios.patch("", updatePayload);
  
        setOldData(attendanceData);
        setUpdateStatus("Attendance updated successfully!");
      } else {
        setUpdateStatus("No changes to update.");
      }
    } catch (error) {
      console.error(error);
      setUpdateStatus("Failed to update attendance.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!hasMountedData) {
    return <p>Loading...</p>;
  }

  if (studentData == null) {
    return <p>Couldn't find details of the student.</p>;
  }

  const { attendancePercentage, sessionsAttended, totalSessions } = calculateAttendanceStats(attendanceData);

  return (
    <div className="student-attendance-page">
      <header className="attendance-header">
        <h1>{studentData.name}</h1>
      </header>

      {!hasMountedAttendanceData ? (
        <p>Loading attendance data...</p>
      ) : (
        <>
          <h2>{attendancePercentage}% Attendance</h2>
          <p>
            Sessions Attended: {sessionsAttended}/{totalSessions}
          </p>

          {attendancePercentage >= 75 && (
            <div className="certificate-box">
              <p>
                {studentData.name} is eligible for the Student Induction Programme participation Certificate.
              </p>
              <a
                href="https://drive.google.com/file/d/1KZ8403PdZHkztkrr6cH3ryoll0JGyYVN/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-link"
              >
                Get Certificate
              </a>
            </div>
          )}

          {attendanceData.map((dayData) => {
            return (
              <div key={dayData.date} className="day-card">
                <h3>{dateFormatter.format(new Date(dayData.date))}</h3>
                <div className="session-card">
                  <button
                    className={`session ${dayData.fnAttendance ? "present" : "absent"}`}
                    onClick={() => toggleAttendance(dayData.date, "fnAttendance")}
                  >
                    Forenoon
                  </button>
                  <button
                    className={`session ${dayData.anAttendance ? "present" : "absent"}`}
                    onClick={() => toggleAttendance(dayData.date, "anAttendance")}
                  >
                    Afternoon
                  </button>
                </div>
              </div>
            );
          })}

          <button className="update-button" onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Attendance"}
          </button>

          {updateStatus && <p className="update-status">{updateStatus}</p>}
        </>
      )}

      <footer className="attendance-footer">
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

export default StudentAttendancePage;
