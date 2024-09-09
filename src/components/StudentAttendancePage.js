import React from "react";
import { useParams } from "react-router-dom";
import "./StudentAttendancePage.css";

const attendanceData = {
  240000: {
    name: "A",
    department: "CSE",
    attendance: {
      Monday: { forenoon: true, afternoon: false },
      Tuesday: { forenoon: true, afternoon: true },
      Wednesday: { forenoon: false, afternoon: false },
      Thursday: { forenoon: false, afternoon: false },
    },
  },
  240001: {
    name: "B",
    department: "ECE",
    attendance: {
      Monday: { forenoon: false, afternoon: true },
      Tuesday: { forenoon: true, afternoon: true },
      Wednesday: { forenoon: false, afternoon: false },
      Thursday: { forenoon: false, afternoon: false },
    },
  },
  240002: {
    name: "C",
    department: "EEE",
    attendance: {
      Monday: { forenoon: true, afternoon: true },
      Tuesday: { forenoon: false, afternoon: false },
      Wednesday: { forenoon: true, afternoon: false },
      Thursday: { forenoon: false, afternoon: true },
    },
  },
  240003: {
    name: "D",
    department: "ER",
    attendance: {
      Monday: { forenoon: false, afternoon: false },
      Tuesday: { forenoon: true, afternoon: false },
      Wednesday: { forenoon: false, afternoon: false },
      Thursday: { forenoon: true, afternoon: true },
    },
  },
  240004: {
    name: "E",
    department: "ME",
    attendance: {
      Monday: { forenoon: true, afternoon: true },
      Tuesday: { forenoon: false, afternoon: false },
      Wednesday: { forenoon: true, afternoon: false },
      Thursday: { forenoon: true, afternoon: true },
    },
  },
  240005: {
    name: "F",
    department: "CE",
    attendance: {
      Monday: { forenoon: false, afternoon: true },
      Tuesday: { forenoon: false, afternoon: false },
      Wednesday: { forenoon: true, afternoon: true },
      Thursday: { forenoon: true, afternoon: false },
    },
  },
  240006: {
    name: "G",
    department: "CHEM",
    attendance: {
      Monday: { forenoon: true, afternoon: false },
      Tuesday: { forenoon: true, afternoon: true },
      Wednesday: { forenoon: false, afternoon: true },
      Thursday: { forenoon: true, afternoon: false },
    },
  },
  240007: {
    name: "H",
    department: "ARCH",
    attendance: {
      Monday: { forenoon: false, afternoon: true },
      Tuesday: { forenoon: true, afternoon: false },
      Wednesday: { forenoon: true, afternoon: true },
      Thursday: { forenoon: false, afternoon: false },
    },
  },
  240008: {
    name: "I",
    department: "CSE",
    attendance: {
      Monday: { forenoon: true, afternoon: true },
      Tuesday: { forenoon: false, afternoon: true },
      Wednesday: { forenoon: true, afternoon: true },
      Thursday: { forenoon: false, afternoon: false },
    },
  },
  240009: {
    name: "J",
    department: "ECE",
    attendance: {
      Monday: { forenoon: false, afternoon: false },
      Tuesday: { forenoon: true, afternoon: true },
      Wednesday: { forenoon: true, afternoon: false },
      Thursday: { forenoon: true, afternoon: true },
    },
  },
  240010: {
    name: "K",
    department: "EEE",
    attendance: {
      Monday: { forenoon: true, afternoon: false },
      Tuesday: { forenoon: false, afternoon: false },
      Wednesday: { forenoon: true, afternoon: true },
      Thursday: { forenoon: true, afternoon: true },
    },
  },
  240011: {
    name: "L",
    department: "ER",
    attendance: {
      Monday: { forenoon: false, afternoon: true },
      Tuesday: { forenoon: true, afternoon: false },
      Wednesday: { forenoon: false, afternoon: false },
      Thursday: { forenoon: true, afternoon: false },
    },
  },
  240012: {
    name: "M",
    department: "ME",
    attendance: {
      Monday: { forenoon: true, afternoon: false },
      Tuesday: { forenoon: true, afternoon: true },
      Wednesday: { forenoon: false, afternoon: true },
      Thursday: { forenoon: true, afternoon: false },
    },
  },
  240013: {
    name: "N",
    department: "CE",
    attendance: {
      Monday: { forenoon: false, afternoon: true },
      Tuesday: { forenoon: false, afternoon: false },
      Wednesday: { forenoon: true, afternoon: true },
      Thursday: { forenoon: true, afternoon: false },
    },
  },
  240014: {
    name: "O",
    department: "CHEM",
    attendance: {
      Monday: { forenoon: true, afternoon: false },
      Tuesday: { forenoon: true, afternoon: true },
      Wednesday: { forenoon: false, afternoon: true },
      Thursday: { forenoon: true, afternoon: false },
    },
  },
  240015: {
    name: "P",
    department: "ARCH",
    attendance: {
      Monday: { forenoon: false, afternoon: true },
      Tuesday: { forenoon: true, afternoon: true },
      Wednesday: { forenoon: true, afternoon: false },
      Thursday: { forenoon: false, afternoon: false },
    },
  },
};

const calculateAttendanceStats = (attendance) => {
  let totalSessions = 0;
  let attendedSessions = 0;

  for (const [day, sessions] of Object.entries(attendance)) {
    // eslint-disable-next-line no-unused-vars
    const daySessions =
      (sessions.forenoon ? 1 : 0) + (sessions.afternoon ? 1 : 0);
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
  const { applicationNumber } = useParams();
  const studentData = attendanceData[applicationNumber];

  if (!studentData) {
    return <p>No attendance data available for this student.</p>;
  }

  const { attendancePercentage, sessionsAttended, totalSessions } =
    calculateAttendanceStats(studentData.attendance);

  return (
    <div className="student-attendance-page">
      <h1>{studentData.name} </h1>
      <h2>{attendancePercentage}% Attendance</h2>
      <p>
        Sessions Attended: {sessionsAttended}/{totalSessions}
      </p>
      {Object.entries(studentData.attendance).map(([day, sessions]) => (
        // eslint-disable-next-line no-unused-vars
        <div key={day} className="day-card">
          <h3>{day}</h3>
          <div className="session-card">
            <div
              className={`session ${sessions.forenoon ? "present" : "absent"}`}
            >
              Forenoon
            </div>
            <div
              className={`session ${sessions.afternoon ? "present" : "absent"}`}
            >
              Afternoon
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentAttendancePage;
