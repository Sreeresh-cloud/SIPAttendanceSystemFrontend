import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <h1>TKMCE</h1>
      <h2>STUDENT INDUCTION PROGRAM</h2>
      <h3>ATTENDANCE SYSTEM</h3>
      <div className="options">
        <Link to="/batches" className="btn btn-primary">
          Batches
        </Link>
        <Link to="/departments" className="btn btn-primary">
          Departments
        </Link>
      </div>
    </div>
  );
};

export default Home;
