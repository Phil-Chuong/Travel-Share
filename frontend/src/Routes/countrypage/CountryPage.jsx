import React from 'react';
import './CountryPage.css';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Navbar from '../../Components/navbar/Navbar';
import CountriesPosts from '../../Components/country-posts/CountriesPosts';
import ScrollToTopButton from '../../Components/scrollToTopButton/ScrollToTopButton';
import Footer from '../../Components/footer/Footer';

const CountryPage = () => {
  return (
    <div className="countryparent">
      <div className='countryheader-section'>
        <h1>TRAVEL<AirplaneTilt size={32} color="red" />SHARE </h1>
      </div>

      <div className='countrylayout-container'> 

        <div className='countrynavbar-section'>
          <Navbar />
        </div>      

        <div className='countrymainbody-section'>
          <CountriesPosts />
        </div>

        <div className='section-section'>
          <div>Section Component </div>
        </div>
        
      </div>
      <ScrollToTopButton />
      <div className='footer-section'>
        <Footer />
      </div>     
    </div>
  )
}

export default CountryPage;