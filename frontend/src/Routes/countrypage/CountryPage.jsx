import React from 'react';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Navbar from '../../Components/navbar/Navbar';
import CountriesPosts from '../../Components/country-posts/CountriesPosts';

const CountryPage = () => {
  return (
    <div className="parent">
      <div className='header-section'>
        <h1>TRAVEL<AirplaneTilt size={32} color="red" />SHARE </h1>
      </div>

      <div className='layout-container'> 
          <Navbar />

        <div className='mainbody-section'>
          <CountriesPosts />
        </div>

        <div className='section-section'>
          <div>Section Component </div>
        </div>
      </div>

      <div className='footer-section'>
        <div>Footer Component </div>
      </div>     
    </div>
  )
}

export default CountryPage;