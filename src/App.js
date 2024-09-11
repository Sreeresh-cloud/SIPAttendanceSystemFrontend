import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BatchesPage from "./components/BatchesPage";
import DaySelector from "./components/DaySelector";
import AttendancePage from "./components/AttendancePage";
import DepartmentsPage from "./components/DepartmentsPage";
import DepartmentStudentsPage from "./components/DepartmentStudentsPage";
import StudentAttendancePage from "./components/StudentAttendancePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/batches" element={<BatchesPage />} />
          <Route path="/batches/:batchNo" element={<DaySelector />} />
          <Route
            path="/attendance/:groupId/:day/:time"
            element={<AttendancePage />}
          />

          <Route path="/departments" element={<DepartmentsPage />} />
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
