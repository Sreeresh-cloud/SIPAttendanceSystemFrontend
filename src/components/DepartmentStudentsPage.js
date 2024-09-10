import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../http-client";

const StudentsTable = ({ students }) => {
  const navigate = useNavigate();
  const handleClick = (student) => navigate(`/student/${student.id}`);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Application Number</th>
          <th>Department</th>
          <th>Attendance</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.admissionNo} onClick={() => handleClick(student)}>
            <td>{`${student.firstName} ${student.lastName}`}</td>
            <td>{student.admissionNo}</td>
            <td>{student.advisor.batch}</td>
            <td>{student.attendancePercentage} %</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const DepartmentStudentsPage = () => {
  const { advisorId } = useParams();
  const [hasMountedAdvisorData, setHasMountedAdvisorData] = useState(false);
  const [advisorData, setAdvisorData] = useState(null);
  const [hasMountedData, setHasMountedData] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getAdvisorData() {
      try {
        const response = await axios.get("/advisors");
        if (response.data == null || !Array.isArray(response.data)) return;
        const advisor = response.data.find(
          (advisor) => advisor.id.toString() === advisorId.toString()
        );
        setHasMountedAdvisorData(true);
        setAdvisorData(advisor);
      } catch (error) {
        console.error(error);
      }
    }
    if (!hasMountedAdvisorData) getAdvisorData();
  }, [advisorId, hasMountedAdvisorData]);

  useEffect(() => {
    if (advisorData == null) return;
    async function getStudentsData() {
      try {
        const response = await axios.get(`/advisor/${advisorId}`);
        if (response.data == null || !Array.isArray(response.data)) return;
        setStudents(
          response.data.sort((s1, s2) =>
            (s1.firstName + s1.lastName).localeCompare(
              s2.firstName + s2.lastName
            )
          )
        );
        setHasMountedData(true);
      } catch (error) {
        console.error(error);
      }
    }
    if (!hasMountedData) getStudentsData();
  }, [advisorId, hasMountedData, advisorData]);

  if (!hasMountedAdvisorData)
    return <div className="department-students-page">Loading...</div>;

  if (advisorData == null)
    return <div className="department-students-page">Not found</div>;

  return (
    <div className="department-students-page">
      <h1>Students in {advisorData.batch} Department</h1>

      {!hasMountedData ? (
        <p>Loading student data</p>
      ) : students.length > 0 ? (
        <StudentsTable students={students} />
      ) : (
        <p>No students available for {advisorData.batch}</p>
      )}
    </div>
  );
};

export default DepartmentStudentsPage;
