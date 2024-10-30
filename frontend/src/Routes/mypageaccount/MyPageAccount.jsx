import React from 'react'
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Navbar from '../../Components/navbar/Navbar';
import './MyPageAccount.css';
import Account from '../../Components/account/Account';
import Footer from '../../Components/footer/Footer';

const MyPageAccount = () => {
  return (
    <main className="settingparent">
      <header className='settingheader-section'>
        <h1>
          TRAVEL<AirplaneTilt size={32} color="red" />
          SHARE
        </h1>
      </header>

      <div className='settinglayout-container'> 
        <nav className='settingnavbar-section'>
          <Navbar />
        </nav>

        <section className='settingmainbody-section'>
          <Account />
        </section>

        <aside className='settingsection-section'>
          <section>Section Component </section>
        </aside>
      </div>

      <footer className='settingfooter-section'>
        <Footer />
      </footer>
    </main>
  )
}

export default MyPageAccount