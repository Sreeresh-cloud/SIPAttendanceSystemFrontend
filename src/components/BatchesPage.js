import React from "react";
import { Link } from "react-router-dom";
import "./BatchesPage.css";
import cc from './images/codingclubtkmce.jpg'; 
import foss from './images/foss-logo.png';


const List = ({ length }) => {
  return (
    <ul className="batch-list">
      {new Array(length).fill(0).map((_, i) => (
        <li key={i} className="batch-item">
          <Link to={`/batches/${i + 1}`} className="batch-link">
            Batch {i + 1}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const BatchesPage = () => {
  return (
    <div className="batches-page">
      <header className="batches-header">
        <h1>Mentors</h1>
      </header>

      <section className="batches-content">
        <List length={21} />
      </section>

      <footer className="batches-footer">
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

export default BatchesPage;
