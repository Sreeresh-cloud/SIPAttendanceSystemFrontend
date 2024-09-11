import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MentorPage from "./components/MentorPage";
import DaySelector from "./components/DaySelector";
import AttendancePage from "./components/AttendancePage";
import AdvisorPage from "./components/AdvisorPage";
import DepartmentStudentsPage from "./components/DepartmentStudentsPage";
import StudentAttendancePage from "./components/StudentAttendancePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/batches" element={<MentorPage />} />
          <Route path="/batches/:batchNo" element={<DaySelector />} />
          <Route
            path="/attendance/:groupId/:day/:time"
            element={<AttendancePage />}
          />

          <Route path="/departments" element={<AdvisorPage />} />
          <Route
            path="/departments/:department"
            element={<DepartmentStudentsPage />}
          />
          <Route path="/student/:id" element={<StudentAttendancePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
