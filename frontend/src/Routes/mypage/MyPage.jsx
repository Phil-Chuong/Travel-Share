import React from 'react';
import './MyPage.css';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Navbar from '../../Components/navbar/Navbar';
import MyHomePage from '../../Components/my-page/MyHomePage';
import Footer from '../../Components/footer/footer';
import ScrollToTopButton from '../../Components/scrollToTopButton/ScrollToTopButton';

const MyPage = () => {
  return (
    <div className="myparent">
      <div className='myheader-section'>
        <h1>TRAVEL<AirplaneTilt size={32} color="red" />SHARE </h1>
      </div>

      <div className='mylayout-container'> 

        <div className='mynavbar-section'>
          <Navbar />
        </div>

        <div className='mymainbody-section'>
          <MyHomePage />
        </div>

        <div className='mysection-section'>
          <div>Section Component </div>
        </div>

      </div>
      <ScrollToTopButton />
      <div className='myfooter-section'>
        <Footer />
      </div>
    </div>
  )
}

export default MyPage