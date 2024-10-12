import React from 'react';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Navbar from '../../Components/navbar/Navbar';
import MyHomePage from '../../Components/my-page/MyHomePage';
import './MyPage.css';


const MyPage = () => {
  return (
    <div className="myparent">
      <div className='header-section'>
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

      <div className='myfooter-section'>
        <div>Footer Component </div>
      </div>
    </div>
  )
}

export default MyPage