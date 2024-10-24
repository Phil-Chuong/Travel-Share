import React from 'react'
import './Footer.css';


function Footer() {
  return (
    <div className='footer-container'>
        <div className='footer-info'><a>About us</a></div>
        <div className='footer-info'>
          <a>TravelShare©2024</a>
          <p>image: Unsplash</p>
        </div>
        <div className='footer-info'><a>Privacy Policy</a></div>
    </div>
  )
}

export default Footer;