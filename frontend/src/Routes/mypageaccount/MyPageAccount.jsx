import React from 'react'
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Navbar from '../../Components/navbar/Navbar';
import './MyPageAccount.css';
import Account from '../../Components/account/Account';
import Footer from '../../Components/footer/Footer';

const MyPageAccount = () => {
  return (
    <div className="settingparent">
      <div className='settingheader-section'>
        <h1>TRAVEL<AirplaneTilt size={32} color="red" />SHARE </h1>
      </div>

      <div className='settinglayout-container'> 

        <div className='settingnavbar-section'>
          <Navbar />
        </div>

        <div className='settingmainbody-section'>
          <Account />
        </div>

        <div className='settingsection-section'>
          <div>Section Component </div>
        </div>

      </div>

      <div className='settingfooter-section'>
        <Footer />
      </div>
    </div>
  )
}

export default MyPageAccount