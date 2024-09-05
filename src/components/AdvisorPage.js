import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvisorPage.css'; 


const departments = ['CSE', 'ECE', 'EEE', 'ER', 'ME', 'CE', 'CHEM', 'ARCH'];

const AdvisorPage = () => {
  const navigate = useNavigate();

  // Function to handle navigation to the department's student list
  const handleDepartmentClick = (department) => {
    navigate(`/departments/${department}`);
  };

  return (
    <div className="advisor-page">
      <h1>Select a Department</h1>
      <ul className="list-group">
        {departments.map((department) => (
          <li
            key={department}
            className="card"
            onClick={() => handleDepartmentClick(department)}
          >
            {department}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvisorPage;
