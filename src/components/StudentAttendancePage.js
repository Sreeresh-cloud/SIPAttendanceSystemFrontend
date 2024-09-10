import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./StudentAttendancePage.css";
import axios from "../http-client";
import { DAYS, dateFormatter } from "../helpers";

const calculateAttendanceStats = (attendanceData) => {
  let totalSessions = 0;
  let attendedSessions = 0;

  for (const dayData of attendanceData) {
    const daySessions =
      (dayData.fnAttendance ? 1 : 0) + (dayData.anAttendance ? 1 : 0);
    totalSessions += 2;
    attendedSessions += daySessions;
  }

  const attendancePercentage = (
    (attendedSessions / totalSessions) *
    100
  ).toFixed(2);

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
  const [hasMountedData, setHasMountedData] = useState(false);
  const [hasMountedAttendanceData, setHasMountedAttendanceData] =
    useState(false);

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
                fnAttendance:
                  response.data === ""
                    ? true
                    : response.data.fnAttendance || true,
                anAttendance:
                  response.data === ""
                    ? true
                    : response.data.anAttendance || true,
              };
            })
          );

          setAttendanceData(attendanceData);
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

  if (!hasMountedData) {
    return <p>Loading...</p>;
  }

  if (studentData == null) {
    return <p>Couldn't find details of the student.</p>;
  }

  const { attendancePercentage, sessionsAttended, totalSessions } =
    calculateAttendanceStats(attendanceData);

  return (
    <div className="student-attendance-page">
      <h1>{`${studentData.firstName}  ${studentData.lastName}`}</h1>
      {!hasMountedAttendanceData ? (
        <p>Loading attendance data...</p>
      ) : (
        <>
          <h2>{attendancePercentage}% Attendance</h2>
          <p>
            Sessions Attended: {sessionsAttended}/{totalSessions}
          </p>
          {attendanceData.map((dayData) => {
            return (
              <div key={dayData.date} className="day-card">
                <h3>{dateFormatter.format(new Date(dayData.date))}</h3>
                <div className="session-card">
                  <div
                    className={`session ${dayData.fnAttendance ? "present" : "absent"}`}
                  >
                    Forenoon
                  </div>
                  <div
                    className={`session ${dayData.anAttendance ? "present" : "absent"}`}
                  >
                    Afternoon
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default StudentAttendancePage;
