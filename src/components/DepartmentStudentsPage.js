import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import axios from "../http-client";
import { DEPARTMENTS } from "../helpers";
import "./DepartmentStudentsPage.css"; 
import cc from "./images/codingclubtkmce.jpg"
import foss from "./images/foss-logo.png"

// Table Component
const StudentsTable = ({ students }) => {
  const navigate = useNavigate();
  const handleClick = (student) => navigate(`/student/${student.id}`);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Application Number</th>
          <th>Attendance %</th>
          <th>SIP Group</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.admissionNo} onClick={() => handleClick(student)}>
            <td>{student.name}</td>
            <td>{student.admissionNo}</td>
            <td>{student.attendancePercentage.toFixed(2)}</td>
            <td>{student.group}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const DepartmentStudentsPage = () => {
  const { department } = useParams();
  const [hasMountedData, setHasMountedData] = useState(false);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("all");

  const calculateAverageAttendance = (students) => {
    if (students.length === 0) return 0; // Handle the case when there are no students
    const totalAttendance = students.reduce(
      (total, student) => total + student.attendancePercentage, 
      0
    );
    return (totalAttendance / students.length).toFixed(2); // Rounded to 2 decimal places
  };

  useEffect(() => {
    async function getStudentsData() {
      try {
        const { data: students } = await axios.get(`/department/${department}`);
        if (students == null || !Array.isArray(students)) return;
        setStudents(students.sort((s1, s2) => s1.name.localeCompare(s2.name)));
        setHasMountedData(true);
      } catch (error) {
        console.error(error);
      }
    }
    if (!hasMountedData) getStudentsData();
  }, [department, hasMountedData]);

  const averageAttendance = calculateAverageAttendance(students);

  const getFilteredStudents = () => {
    if (filter === "eligible") {
      return students.filter(student => student.attendancePercentage >= 75);
    } else if (filter === "not-eligible") {
      return students.filter(student => student.attendancePercentage < 75);
    }
    return students; // "all" case
  };


  return (
    <div className="department-students-page">
      {/* Header Section */}
      <header className="department-header">
        <h1>Students in {DEPARTMENTS[department]} Department</h1>
      </header>

      <div className="average-attendance">
              <p>Average Attendance: {averageAttendance}%</p>
      </div>

      <div className="filter-section">
  <label htmlFor="filter">Filter: </label>
  <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
    <option value="all">All</option>
    <option value="eligible">Eligible (Attendance ≥ 75%)</option>
    <option value="not-eligible">Not Eligible (Attendance &lt; 75%)</option>
  </select>
</div>

      <div className="department-content">
        {!hasMountedData ? (
          <p>Loading student data...</p>
        ) : students.length > 0 ? (
          <StudentsTable students={getFilteredStudents()} />
        ) : (
          <p>No students available for {DEPARTMENTS[department]}</p>
        )}
      </div>

      {/* Footer Section */}
      <footer className="department-footer">
        <p>&copy; 2024 TKMCE. All rights reserved.</p>
        <p>Powered by </p>
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

export default DepartmentStudentsPage;
