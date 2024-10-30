import React from 'react';
import './MyPage.css';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Navbar from '../../Components/navbar/Navbar';
import MyHomePage from '../../Components/my-page/MyHomePage';
import ScrollToTopButton from '../../Components/scrollToTopButton/ScrollToTopButton';
import Footer from '../../Components/footer/Footer';

const MyPage = () => {
  return (
    <main className="myparent">
      <header className='myheader-section'>
        <h1>TRAVEL<AirplaneTilt size={32} color="red" />SHARE </h1>
      </header>

      <div className='mylayout-container'> 
        <nav className='mynavbar-section'>
          <Navbar />
        </nav>

        <section className='mymainbody-section'>
          <MyHomePage />
        </section>

        <aside className='mysection-section'>
          <section>Section Component </section>
        </aside>
      </div>

      <ScrollToTopButton />

      <footer className='myfooter-section'>
        <Footer />
      </footer>
    </main>
  )
}

export default MyPage