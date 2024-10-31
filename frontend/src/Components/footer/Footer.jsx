import React from 'react';
import './Footer.css';
import { InstagramLogo, FacebookLogo, GithubLogo, List } from '@phosphor-icons/react'

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-summary">
        <List size={24} />
      </div>
      <div className="footer-info">
        <div className="footer-section">
          <a href="#">Email: TravelShare@TS.com</a>
        </div>
        <div className="footer-section">
          <InstagramLogo size={24} />
          <FacebookLogo size={24} />
          <GithubLogo size={24} />
        </div>
        <div className="footer-section">
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-section">
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
