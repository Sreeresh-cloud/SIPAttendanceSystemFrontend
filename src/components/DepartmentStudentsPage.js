import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const studentsData = [
  { name: "A", department: "CSE", applicationNumber: "240000" },
  { name: "B", department: "ECE", applicationNumber: "240001" },
  { name: "C", department: "EEE", applicationNumber: "240002" },
  { name: "D", department: "ER", applicationNumber: "240003" },
  { name: "E", department: "ME", applicationNumber: "240004" },
  { name: "F", department: "CE", applicationNumber: "240005" },
  { name: "G", department: "CHEM", applicationNumber: "240006" },
  { name: "H", department: "ARCH", applicationNumber: "240007" },
  { name: "I", department: "CSE", applicationNumber: "240008" },
  { name: "J", department: "ECE", applicationNumber: "240009" },
  { name: "K", department: "EEE", applicationNumber: "240010" },
  { name: "L", department: "ER", applicationNumber: "240011" },
  { name: "M", department: "ME", applicationNumber: "240012" },
  { name: "N", department: "CE", applicationNumber: "240013" },
  { name: "O", department: "CHEM", applicationNumber: "240014" },
  { name: "P", department: "ARCH", applicationNumber: "240015" },
];

const DepartmentStudentsPage = () => {
  const { department } = useParams();
  const navigate = useNavigate();

  const departmentStudents = useMemo(
    () =>
      studentsData
        .filter((student) => student.department === department)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [department]
  );

  const handleStudentClick = (student) => {
    navigate(`/student/${student.applicationNumber}`);
  };

  return (
    <div className="department-students-page">
      <h1>Students in {department} Department</h1>

      {departmentStudents.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Application Number</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {departmentStudents.map((student) => (
              <tr
                key={student.applicationNumber}
                onClick={() => handleStudentClick(student)}
              >
                <td>{student.name}</td>
                <td>{student.applicationNumber}</td>
                <td>{student.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students available for {department}</p>
      )}
    </div>
  );
};

export default DepartmentStudentsPage;
