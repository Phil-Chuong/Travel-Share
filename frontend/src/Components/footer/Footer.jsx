import React from 'react'
import './Footer.css';


function Footer() {
  return (
    <div className='footer-container'>
        <div className='footer-info'>
          <a>About us</a>
          <p>TravelShare@TS.com</p>
          <p>Contact info</p>
        </div>
        <div className='footer-info'>
          <a>TravelShare©2024</a>
          <p>image: Unsplash</p>
        </div>
        <div className='footer-info'>
          <a>Privacy Policy</a>
          <p>Terms & Conditions</p>
        </div>
    </div>
  )
}

export default Footer;