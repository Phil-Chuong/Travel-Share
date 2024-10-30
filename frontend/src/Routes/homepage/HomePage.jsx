import React from 'react';
import './HomePage.css';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Mainpost from '../../Components/main-post/Mainpost';
import Navbar from '../../Components/navbar/Navbar';
import ScrollToTopButton from '../../Components/scrollToTopButton/ScrollToTopButton';
import Footer from '../../Components/footer/Footer';

const HomePage = () => {
  return (
    <main className="parent">
      <header className='header-section'>
        <h1>
          TRAVEL<AirplaneTilt size={32} color="red" />
          SHARE 
        </h1>
      </header>

      <div className='layout-container'> 
        <nav className='navbar-section'>
          <Navbar />
        </nav>

        <section className='mainbody-section'>
          <Mainpost />
        </section>

        <aside className='section-section'>
          <section>Section Component </section>
        </aside>        
      </div>

      <ScrollToTopButton />

      <footer className='footer-section'>
        <Footer />
      </footer>
    </main>
  )
}

export default HomePage;