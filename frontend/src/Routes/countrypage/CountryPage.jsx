import React from 'react';
import './CountryPage.css';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Navbar from '../../Components/navbar/Navbar';
import CountriesPosts from '../../Components/country-posts/CountriesPosts';

const CountryPage = () => {
  return (
    <div className="countryparent">
      <div className='countryheader-section'>
        <h1>TRAVEL<AirplaneTilt size={32} color="red" />SHARE </h1>
      </div>

      <div className='countrylayout-container'> 
          <Navbar />

        <div className='countrymainbody-section'>
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