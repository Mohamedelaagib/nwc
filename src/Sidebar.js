// Sidebar.jsx

import React from 'react';
import './Sidebar.css'; 

const Sidebar = ({ statistics }) => {
  return (
    <div className="sidebar">
      <h2>Map Statistics</h2>
      <div className="statistics-container">
        {Object.entries(statistics).map(([label, value]) => (
          <div className="statistic-card" key={label}>
            <div className="statistic-label">{label}</div>
            <div className="statistic-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
