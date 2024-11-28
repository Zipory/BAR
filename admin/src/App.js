import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./HomePage.css";
import Sidebar from "./components/web-manager/Sidebar";
import Dashboard from "./components/web-manager/Dashboard";

const App = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <Routes>
      <Route path="/" element={  <Dashboard />}/>
      </Routes>
    </div>
  );
};

export default App;
