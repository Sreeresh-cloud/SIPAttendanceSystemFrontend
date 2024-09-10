import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MentorPage.css";
import axios from "../http-client";

const List = ({ groups }) => {
  return (
    <ul className="list-group">
      {groups.map((group) => (
        <li key={group.id} className="list-group-item">
          <Link to={`/mentors/${group.id}`}>Group {group.groupNo} ({group.name})</Link>
        </li>
      ))}
    </ul>
  );
};

const MentorPage = () => {
  const [hasMountedData, setHasMountedData] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function getMentors() {
      try {
        const response = await axios.get("/mentors");
        setGroups(response.data);
        setHasMountedData(true);
      } catch (error) {
        console.error(error);
      }
    }
    if (!hasMountedData) getMentors();
  }, [hasMountedData]);

  return (
    <div className="mentor-page">
      <h1>Mentors</h1>
      {hasMountedData ? <List groups={groups} /> : <div>Loading...</div>}
    </div>
  );
};

export default MentorPage;
