import React from 'react';
import './CountryPage.css';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import Navbar from '../../Components/navbar/Navbar';
import CountriesPosts from '../../Components/country-posts/CountriesPosts';
import ScrollToTopButton from '../../Components/scrollToTopButton/ScrollToTopButton';
import Footer from '../../Components/footer/Footer';

const CountryPage = () => {
  return (
    <main className="countryparent">
      <header className='countryheader-section'>
        <h1>
          TRAVEL<AirplaneTilt size={32} color="red" />
          SHARE 
        </h1>
      </header>

      <div className='countrylayout-container'> 
        <nav className='countrynavbar-section'>
          <Navbar />
        </nav>      

        <section className='countrymainbody-section'>
          <CountriesPosts />
        </section>

        <aside className='countrysection-section'>
          <section>Section Component </section>
        </aside>  
      </div>

      <ScrollToTopButton />

      <footer className='countryfooter-section'>
        <Footer />
      </footer>     
    </main>
  )
}

export default CountryPage;