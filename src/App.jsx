import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/LoginPage';
import UserDashboard from './components/UserHome';
import AdminDashboard from './components/AdminHome';
import AdminSideBar from './components/AdminSideBar';
import UserSideBar from './components/UserSideBar';
import TestForm from './components/TestForm';
import TestsPage from './components/TestPage';
import ProblemsPage from './components/ProblemsPage';
import CodeSpace from './components/CodePage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      console.log('Authentication status from localStorage:', authStatus);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const AppContent = ({ isAuthenticated, handleLogout }) => {
    const location = useLocation();
    const isCodeSpaceRoute = location.pathname.startsWith('/codespace');

    return (
      <div className="app-container">
        {isAuthenticated && !isCodeSpaceRoute && <UserSideBar onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/user" element={isAuthenticated ? <UserDashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/admin" element={isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/questions" element={isAuthenticated ? <TestForm /> : <Navigate to="/" />} />
            <Route path="/tests" element={isAuthenticated ? <TestsPage /> : <Navigate to="/" />} />
            <Route path="/tests/:customId/questions" element={isAuthenticated ? <ProblemsPage /> : <Navigate to="/" />} />
            <Route path="/codespace/:problemId" element={isAuthenticated ?<Navigate to="/" />:<CodeSpace />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
    </Router>
  );
}

export default App;
