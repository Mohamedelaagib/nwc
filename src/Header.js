import React from 'react';
import './Header.css'; 
import CompanyLogo from './Assets/NWC-Logo.svg'; 

const Header = () => {
  return (
    <header className="header">
      <div className='headerCotent'>
      <div className="logo-container">
        <img src={CompanyLogo} alt="Company Logo" className="logo" />
      </div>
      <div className="company-name">NWC Hajj- Plgrims\WC Distribution</div>
      <div className=""> </div>
    </div></header>
  );
};

export default Header;