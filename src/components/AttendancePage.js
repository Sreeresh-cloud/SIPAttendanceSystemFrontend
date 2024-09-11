import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./AttendancePage.css";
import axios from "../http-client";

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

  const attendancePropKey = useMemo(() => {
    return time === "FORENOON" ? "fnAttendance" : "anAttendance";
  }, [time]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    async function getAttendanceData() {
      try {
        const { data: students } = await axios.get(`/group/${groupId}`);
        if (students == null || !Array.isArray(students)) return;

        const { data: attendanceData } = await axios.get(
          `/group/${groupId}/${date}`
        );
        if (attendanceData == null || !Array.isArray(attendanceData)) return;

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
            .map((student) => {
              return {
                student: student,
                fnAttendance: organized[student.id]?.fnAttendance ?? true,
                anAttendance: organized[student.id]?.anAttendance ?? true,
              };
            })
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
      // TODO: fix this after fixing in backend
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
      <h1>
        {groupId} - {date} - {time}
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

      {updateStatus && <div>{updateStatus}</div>}
    </div>
  );
};

export default AttendancePage;
