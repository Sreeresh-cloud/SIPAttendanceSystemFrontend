import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./AttendancePage.css";
import axios from "../http-client";
import cc from "./images/codingclubtkmce.jpg"; 
import foss from "./images/foss-logo.png"; 
const AttendanceListRow = ({ student, present, onToggle }) => {
  return (
    <tr key={student.id}>
      <td>{student.name}</td>
      <td>{student.department}</td>
      <td>
        <button
          className={`btn ${present ? "btn-success" : "btn-danger"}`}
          onClick={onToggle}
        >
          {present ? "Present" : "Absent"}
        </button>
      </td>
    </tr>
  );
};

const AttendancePage = () => {
  const { groupId, day: date, time } = useParams();
  const [hasMountedData, setHasMountedData] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [oldData, setOldData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");

  const attendancePropKey = useMemo(() => {
    return time === "FORENOON" ? "fnAttendance" : "anAttendance";
  }, [time]);

  useEffect(() => {
    async function getAttendanceData() {
      try {
        const { data: students } = await axios.get(`/group/${groupId}`);
        if (!Array.isArray(students)) return;

        const { data: attendanceData } = await axios.get(
          `/group/${groupId}/${date}`
        );
        if (!Array.isArray(attendanceData)) return;

        const organized = attendanceData.reduce((prev, attendance) => {
          prev[attendance.student.id] = {
            fnAttendance: attendance.fnAttendance,
            anAttendance: attendance.anAttendance,
          };
          return prev;
        }, {});

        setOldData(organized);

        setAttendance(
          students
            .sort((s1, s2) => s1.name.localeCompare(s2.name))
            .map((student) => ({
              student,
              fnAttendance: organized[student.id]?.fnAttendance ?? true,
              anAttendance: organized[student.id]?.anAttendance ?? true,
            }))
        );

        setHasMountedData(true);
      } catch (error) {
        console.error(error);
      }
    }

    if (!hasMountedData) getAttendanceData();
  }, [hasMountedData, groupId, date, time]);

  const toggleAttendance = (index) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index][attendancePropKey] =
      !attendance[index][attendancePropKey];
    setAttendance(updatedAttendance);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      for (const data of attendance) {
        const initial = {
          fnAttendance: oldData[data.student.id]?.fnAttendance ?? true,
          anAttendance: oldData[data.student.id]?.anAttendance ?? true,
        };

        if (
          data.fnAttendance === initial.fnAttendance &&
          data.anAttendance === initial.anAttendance
        )
          continue;

        await axios.patch("", {
          studentId: data.student.id,
          date: date,
          fnAttendance: data.fnAttendance,
          anAttendance: data.anAttendance,
        });

        oldData[data.student.id] = {
          fnAttendance: data.fnAttendance,
          anAttendance: data.anAttendance,
        };
      }
      setUpdateStatus("Updated successfully!");
    } catch (error) {
      console.error(error);
      setUpdateStatus("Failed to update.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="attendance-page">
      <header className="attendance-header">
        <h1>Attendance Marker</h1>
      </header>

      <section className="attendance-content">
        <h1 className="attendance-title">
          Batch{groupId} - {date} - {time}
        </h1>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((data, i) => (
              <AttendanceListRow
                key={data.student.id}
                student={data.student}
                onToggle={() => toggleAttendance(i)}
                present={data[attendancePropKey]}
              />
            ))}
          </tbody>
        </table>

        <div className="update-button-container">
          <button
            className={`btn-update ${isUpdating ? "loading" : ""}`}
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Attendance"}
          </button>
        </div>

        {updateStatus && <div className="update-status">{updateStatus}</div>}
      </section>

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

export default AttendancePage;
