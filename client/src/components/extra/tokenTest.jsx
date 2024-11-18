import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';

const checkFunction = (condition) => {
  return condition; // Return true to allow, false to block.
};

// Custom Route Component
const ProtectedRoute = ({ condition, children }) => {
  if (checkFunction(condition)) {
    return children; // Render the child component if the check passes.
  } else {
    return <Navigate to="/not-allowed" />; // Redirect if the check fails.
  }
};

// Example Components
const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;
const Dashboard = () => <div>Dashboard</div>;
const NotAllowed = () => <div>Access Denied</div>;

const TokenTest = () => {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/contact"
          element={
            <ProtectedRoute condition={true /* Replace with your logic */}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute condition={false /* Replace with your logic */}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/not-allowed" element={<NotAllowed />} />
      </Routes>
    
  );
};

export default TokenTest;
