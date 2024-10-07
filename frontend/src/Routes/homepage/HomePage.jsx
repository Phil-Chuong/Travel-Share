import React from 'react';
import './HomePage.css';
import '../../Components/main-post/Mainpost';
import Mainpost from '../../Components/main-post/Mainpost';
import Navbar from '../../Components/navbar/Navbar';

const HomePage = () => {
  return (
    <div className="parent">
      <div className='header-section'>
        <div className="header">TRAVEL SHARE </div>
      </div>

      <div className='layout-container'> 
        <div className='navbar-section'>
          <div className="navbar">navbar</div>
        </div>

        <div className='mainbody-section'>
          <div className="mainbody"><Mainpost /></div>
        </div>

        <div className='section-section'>
          <div className="section">Section Component </div>
        </div>
      </div>

      <div className='footer-section'>
        <div className="footer">Footer Component </div>
      </div>     
    </div>
  )
}

export default HomePage;