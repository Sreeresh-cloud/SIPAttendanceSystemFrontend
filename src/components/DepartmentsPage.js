import React from "react";
import { useNavigate } from "react-router-dom";
import "./DepartmentsPage.css";
import { DEPARTMENT_IDS, DEPARTMENTS } from "../helpers";
import cc from "./images/codingclubtkmce.jpg"
import foss from "./images/foss-logo.png"


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
      <header className="advisor-header">
        <h1>Select a Department</h1>
      </header>

      <List departments={DEPARTMENT_IDS} />

      <footer className="advisor-footer">
        <p>&copy; 2024 TKMCE. All rights reserved.</p>
        <p>Powered by</p>
        <div className="footer-logos">
        <img src={cc} alt="Coding Club Logo" className="footer-logo" />
        <img src={foss} alt="FOSS Logo" className="footer-logo" />
        </div>
      </footer>
    </div>
  );
};

export default DepartmentsPage;
