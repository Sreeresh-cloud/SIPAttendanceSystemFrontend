import React from "react";
import { Link } from "react-router-dom";
import "./BatchesPage.css";

const List = ({ length }) => {
  return (
    <ul className="list-group">
      {new Array(length).fill(0).map((_, i) => (
        <li key={i} className="list-group-item">
          <Link to={`/batches/${i + 1}`}>Batch {i + 1}</Link>
        </li>
      ))}
    </ul>
  );
};

const BatchesPage = () => {
  return (
    <div className="mentor-page">
      <h1>Mentors</h1>
      <List length={21} />
    </div>
  );
};

export default BatchesPage;
