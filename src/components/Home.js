import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import cc from './images/codingclubtkmce.jpg'; 
import background from './images/tkmcepic.jpg'; 
import foss from './images/foss-logo.png';
import Tkmlogo from './images/Tkmlogo.jpg';

const Home = () => {
  return (
    <div className="home-page">
      <header className="header">
        <img src={Tkmlogo} alt="TKMCE Logo" className="logo" />
        <h1>TKM COLLEGE OF ENGINEERING</h1>
        <h2>Government Aided & Autonomous Institution</h2>
      </header>

      <section className="content" style={{ backgroundImage: `url(${background})` }}>
        <h3>SYNERGOS'24</h3>
        <h4>STUDENT INDUCTION PROGRAMME 2024</h4>
        <h5>ATTENDANCE SYSTEM</h5>
        <div className="options">
          <Link to="/batches" className="btn btn-primary">
            Batches
          </Link>
          <Link to="/departments" className="btn btn-primary">
            Departments
          </Link>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 TKMCE. All rights reserved.</p>
        <p>Powered by</p>
        <div className="footer-logos">
          <img src={cc} alt="Coding Club TKMCE Logo" className="footer-logo cc-logo" />
          <img src={foss} alt="FOSS TKMCE Logo" className="footer-logo" />
        </div>
      </footer>
    </div>
  );
};

export default Home;
