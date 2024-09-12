import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import axios from "../http-client";
import { DEPARTMENTS } from "../helpers";
import "./DepartmentStudentsPage.css"; // Assuming there's a CSS file for the page
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
          <th>SIP Group</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.admissionNo} onClick={() => handleClick(student)}>
            <td>{student.name}</td>
            <td>{student.admissionNo}</td>
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

  return (
    <div className="department-students-page">
      {/* Header Section */}
      <header className="department-header">
        <h1>Students in {DEPARTMENTS[department]} Department</h1>
      </header>

      <div className="department-content">
        {!hasMountedData ? (
          <p>Loading student data...</p>
        ) : students.length > 0 ? (
          <StudentsTable students={students} />
        ) : (
          <p>No students available for {DEPARTMENTS[department]}</p>
        )}
      </div>

      {/* Footer Section */}
      <footer className="department-footer">
        <p>&copy; 2024 TKMCE. All rights reserved.</p>
        <p>Powered by </p>
        <div className="footer-logos">
          {/* Placeholder for logos, replace src with your actual paths */}
          <img src={cc} alt="Coding Club Logo" className="footer-logo" />
          <img src={foss} alt="FOSS Logo" className="footer-logo" />
        </div>
      </footer>
    </div>
  );
};

export default DepartmentStudentsPage;
