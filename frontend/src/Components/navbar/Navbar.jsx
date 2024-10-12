import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { House, IdentificationBadge, Globe, SignOut } from '@phosphor-icons/react';

const Navbar = () => {

  return (
    <div className='navbar'>
      <div className='navbar-section'>
        <div className='nav-mainpage'>
          <Link to={'/'}><House size={32} style={{color: 'black'}}/></Link>
        </div>
        <div className='nav-mypage'>
          <Link to={'/mypage'}><IdentificationBadge size={32} style={{color: 'black'}}/></Link>
        </div>
        <div className='nav-worldposts'>
          <Link><Globe size={32} style={{color: 'black'}}/></Link>
        </div>
        <div className='nav-logout'>
          <Link to={'/login'}><SignOut size={32} style={{color: 'black'}}/></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar