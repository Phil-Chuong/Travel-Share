import React from 'react';
import './CountryPage.css';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Navbar from '../../Components/navbar/Navbar';
import CountriesPosts from '../../Components/country-posts/CountriesPosts';

const CountryPage = () => {
  return (
    <div className="parent">
      <div className='header-section'>
      <div className="header"><h1>TRAVEL<AirplaneTilt size={32} color="red" />SHARE </h1></div>
      </div>

      <div className='layout-container'> 
        <div className='navbar-section'>
          <div className="navbar">navbar</div>
        </div>

        <div className='mainbody-section'>
          <div className="mainbody"><CountriesPosts /></div>
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

export default CountryPage;