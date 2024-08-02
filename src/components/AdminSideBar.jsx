import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const AdminSideBar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
      navigate('/');
    } else {
      console.error('onLogout is not a function');
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/questions">Questions</Link></li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminSideBar;
