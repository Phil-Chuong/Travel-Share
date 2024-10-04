import React from 'react';
import './HomePage.css';
import '../../Components/main-post/Mainpost';
import Mainpost from '../../Components/main-post/Mainpost';
import Navbar from '../../Components/navbar/Navbar';

const HomePage = () => {
  return (
    <div className="parent">
      <div className="header">TRAVEL SHARE </div>
      <div className="sidebar"><Navbar /></div>
      <div className="mainbody"><Mainpost /></div>
      <div className="section">Section Component </div>
      <div className="footer">Footer Component </div>
    </div>
  )
}

export default HomePage;