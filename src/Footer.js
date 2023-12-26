import React from 'react';
import './Footer.css'; 
import footerLogo from './Assets/FooterLogo.svg'; 


const Footer=()=>{




    return (
    
    
    
<div className="footer">

<div className='footerContent'>
       
        <div className="copyright">
    <h3>National Water Company -Assets Management Department</h3>
    </div>
        
        <div className="footer-logo-container">
        <img src={footerLogo} alt="Footer Company Logo" className="footerlogo" />
      </div>

</div>



</div>


);}
export default Footer;