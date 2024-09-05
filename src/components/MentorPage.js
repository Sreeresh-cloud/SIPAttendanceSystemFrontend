import React from 'react';
import { Link } from 'react-router-dom';
import './MentorPage.css';

const groups = [
  { id: 'G1', name: 'G1 (Mentor X)' },
  { id: 'G2', name: 'G2 (Mentor Y)' },
  { id: 'G3', name: 'G3 (Mentor Z)' },
  { id: 'G4', name: 'G4 (Mentor W)' }
];

const MentorPage = () => {
  return (
    <div className="mentor-page">
      <h1>Mentors</h1>
      <ul className="list-group">
        {groups.map(group => (
          <li key={group.id} className="list-group-item">
            <Link to={`/mentors/${group.id}`}>{group.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorPage;
