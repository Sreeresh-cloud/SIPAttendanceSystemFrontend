import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../http-client";
import "./AdvisorPage.css";

const List = ({ advisors }) => {
  const navigate = useNavigate();

  return (
    <ul className="list-group">
      {advisors.map((advisor) => (
        <li
          key={advisor.batch}
          className="card"
          onClick={() => navigate(`/departments/${advisor.id}`)}
        >
          {advisor.batch} ({advisor.name})
        </li>
      ))}
    </ul>
  );
};

const AdvisorPage = () => {
  const [hasMountedData, setHasMountedData] = useState(false);
  const [advisors, setAdvisors] = useState([]);

  useEffect(() => {
    async function getAdvisors() {
      try {
        const response = await axios.get("/advisors");
        setAdvisors(response.data);
        setHasMountedData(true);
      } catch (error) {
        console.error(error);
      }
    }
    if (!hasMountedData) getAdvisors();
  }, [hasMountedData]);

  return (
    <div className="advisor-page">
      <h1>Select a Department</h1>
      <List advisors={advisors} />
    </div>
  );
};

export default AdvisorPage;
