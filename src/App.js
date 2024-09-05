import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MentorPage from './components/MentorPage';
import DaySelector from './components/DaySelector';
import AttendancePage from './components/AttendancePage';
import AdvisorPage from './components/AdvisorPage'; // Import AdvisorPage
import DepartmentStudentsPage from './components/DepartmentStudentsPage'; // Import DepartmentStudentsPage

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentors" element={<MentorPage />} />
          <Route path="/mentors/:groupId" element={<DaySelector />} />
          <Route path="/attendance/:groupId/:day/:time" element={<AttendancePage />} />
          {/* Route for Advisors */}
          <Route path="/advisors" element={<AdvisorPage />} />
          {/* Route for students by department */}
          <Route path="/departments/:department" element={<DepartmentStudentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
