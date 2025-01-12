// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PageView from './pages/PageView';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SimpleTest from './pages/SimpleTest'; // Ensure this file exists

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pages/:id" element={<PageView />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPage />
              </ProtectedRoute>
            }
          />
          <Route path="/test-simple" element={<SimpleTest />} /> {/* Test route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
