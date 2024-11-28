import React from "react";
import "./HomePage.css"; 
import Sidebar from "./components/web-manager/Sidebar";
import Dashboard from "./components/web-manager/Dashboard";

const HomePage = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default HomePage;
