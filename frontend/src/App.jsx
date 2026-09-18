import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataContext';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import B2BBilling from './pages/B2BBilling';
import B2CBilling from './pages/B2CBilling';
import Procurement from './pages/Procurement';
import Reports from './pages/Reports';
import Login from './pages/Login';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AppDataProvider>
      <Router>
        <Routes>
          {!isAuthenticated ? (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          ) : (
            <Route path="/" element={<Layout onLogout={handleLogout} />}>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="b2b" element={<B2BBilling />} />
              <Route path="b2c" element={<B2CBilling />} />
              <Route path="procurement" element={<Procurement />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          )}
        </Routes>
      </Router>
    </AppDataProvider>
  );
}

export default App;
