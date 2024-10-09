import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className='navbar'>
      <div className='navbar-section'>
        <div className='nav-mainpage'>
          <Link to={'/'}>main Page</Link>
        </div>
        <div className='nav-mypage'>
          <Link to={'/mypage'}>mypage</Link>
        </div>
        <div className='nav-worldposts'>
          <Link>world post</Link>
        </div>
        <div className='nav-logout'>
          <Link to={'/login'}>logout</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar