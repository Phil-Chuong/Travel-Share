import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate  } from 'react-router-dom';
import { House, IdentificationBadge, Globe, SignOut } from '@phosphor-icons/react';
import axios from 'axios';

const Navbar = () => {
  const [countryId, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  // Fetch countries from the backend
  useEffect(() => {
    const fetchCountries = async () => {
        try {
            const response = await axios.get('/countries');
            setCountries(response.data); // Set the countries directly
        } catch (err) {
            console.error('Error fetching countries:', err);
            setError('Failed to load countries');
        }
    };

    fetchCountries();
  }, []);

  // Handle country selection
  const handleCountryChange = (id) => {
    setCountry(id);
    console.log('Selected country ID:', id);
    if (id) {
      // Navigate to the selected country's page
      navigate(`/country/${id}`);
    }
  };

  // Toggle dropdown visibility when the Globe icon is clicked
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Close the dropdown if a click happens outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the dropdown is open and the clicked target is not inside the dropdown
      if (dropdownVisible && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // Close the dropdown
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when the component is unmounted or updated
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className='navbar'>
      <div className='navbar-section'>

        <div className='nav-mainpage'>
          <Link to={'/'}><House size={32} style={{color: 'black'}}/></Link>
        </div>

        <div className='nav-mypage'>
          <Link to={'/mypage'}><IdentificationBadge size={32} style={{color: 'black'}}/></Link>
        </div>

        {/* World Posts Dropdown with Globe Icon Button */}
        <div className='nav-worldposts'>
          <div className='dropdown-icon'>
            {/* Globe button toggles the dropdown */}
            <button onClick={toggleDropdown} className='globe-button'>
              <Globe size={32} style={{ color: 'black' }} />
            </button>

            {/* Conditionally render the country list when dropdown is visible */}
            {dropdownVisible && (
              <div ref={dropdownRef} className='custom-dropdown'>
                {countries.map(country => (
                  <div 
                    key={country.id} 
                    className='dropdown-item' 
                    onClick={() => handleCountryChange(country.id)}
                  >
                    {country.country_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='nav-logout'>
          <Link to={'/login'}><SignOut size={32} style={{color: 'black'}}/></Link>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar