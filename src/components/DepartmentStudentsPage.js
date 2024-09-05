import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

// Sample students data with attendance history
const studentsData = [
  { name: 'A', department: 'CSE', attendance: '80%' },
  { name: 'B', department: 'ECE', attendance: '90%' },
  { name: 'C', department: 'EEE', attendance: '85%' },
  { name: 'D', department: 'ER', attendance: '75%' },
  { name: 'E', department: 'ME', attendance: '70%' },
  { name: 'F', department: 'CE', attendance: '95%' },
  { name: 'G', department: 'CHEM', attendance: '88%' },
  { name: 'H', department: 'ARCH', attendance: '92%' },
  { name: 'I', department: 'CSE', attendance: '78%' },
  { name: 'J', department: 'ECE', attendance: '85%' },
  {name: 'K', department: 'EEE', attendance: '80%' }, 
  { name: 'L', department: 'ER', attendance: '70%' }, 
  { name: 'M', department: 'ME', attendance: '82%' }, 
  { name: 'N', department: 'CE', attendance: '90%' }, 
  { name: 'O', department: 'CHEM', attendance: '75%' }, 
  { name: 'P', department: 'ARCH', attendance: '85%' }
];

const DepartmentStudentsPage = () => {
  const { department } = useParams(); // Get department from the URL

  // Filter and sort students by department and name in ascending order
  const departmentStudents = useMemo(
    () =>
      studentsData
        .filter((student) => student.department === department)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [department]
  );

  return (
    <div className="department-students-page">
      <h1>Students in {department} Department</h1>

      {departmentStudents.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {departmentStudents.map((student) => (
              <tr key={student.name}>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.attendance}</td>
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
