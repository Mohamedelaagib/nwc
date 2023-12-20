// Header.jsx

import React from 'react';
import './Header.css'; 
import CompanyLogo from './FooterLogo.svg'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={CompanyLogo} alt="Company Logo" className="logo" />
      </div>
      <div className="company-name">NWC HAJJ </div>
    </header>
  );
};

export default Header;
