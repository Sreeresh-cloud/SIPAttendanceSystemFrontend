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

export default DepartmentsPage;
