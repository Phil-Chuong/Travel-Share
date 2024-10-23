import React from 'react';
import './HomePage.css';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Mainpost from '../../Components/main-post/Mainpost';
import Navbar from '../../Components/navbar/Navbar';
import Footer from '../../Components/footer/footer';
import ScrollToTopButton from '../../Components/scrollToTopButton/ScrollToTopButton';

const HomePage = () => {
  return (
    <div className="parent">
      <div className='header-section'>
        <h1>TRAVEL<AirplaneTilt size={32} color="red" />SHARE </h1>
      </div>

      <div className='layout-container'> 

        <div className='navbar-section'>
          <Navbar />
        </div>

        <div className='mainbody-section'>
          <Mainpost />
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

export default HomePage;