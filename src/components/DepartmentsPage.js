import React from "react";
import { useNavigate } from "react-router-dom";
import "./DepartmentsPage.css";
import { DEPARTMENT_IDS, DEPARTMENTS } from "../helpers";

const List = ({ departments }) => {
  const navigate = useNavigate();

  return (
    <ul className="list-group">
      {departments.map((department) => (
        <li
          key={department}
          className="card"
          onClick={() => navigate(`/departments/${department}`)}
        >
          {DEPARTMENTS[department]}
        </li>
      ))}
    </ul>
  );
};

const DepartmentsPage = () => {
  return (
    <div className="advisor-page">
      <h1>Select a Department</h1>
      <List departments={DEPARTMENT_IDS} />
    </div>
  );
};

export default DepartmentsPage;
