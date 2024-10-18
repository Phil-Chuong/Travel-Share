import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import { useNavigate, Link } from 'react-router-dom';
import PopoverDropdown from '../../Components/countrypopover/PopoverDropdown';

function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [countryId, setCountryId] = useState('');
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/authentication/register', { firstname, lastname, username, location: countryId, email, password });
            // Store JWT in local storage
            const { accessToken, newUser } = response.data;

            localStorage.setItem('token', accessToken); // Store JWT in local storage
            localStorage.setItem('userId', newUser.id);
            console.log('Stored userId:', localStorage.getItem('userId'));
            
            console.log('Token:', accessToken); // This looks fine as per your logs
            console.log('User ID:', newUser.id); // Verify this logs the correct ID

            navigate('/mypage'); // Navigate to the dashboard after registration
        } catch (error) {
            setError('Error registering user');
            console.error('Login error:', error);
        }
    };

    return (
        <div className='register-container'>
            <div className='register-box'>
                <div className='register-logo'>
                    <AirplaneTilt size={58} color="red" />
                </div>
                <h2>Sign Up</h2>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <PopoverDropdown 
                            options={countries} 
                            selected={countryId} 
                            onSelect={(country) => {
                                setCountryId(country);
                            }} 
                        />
                        <input 
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    <button type="submit"><p>Register</p></button>
                    </form>
                </div>
                <div className='link-login'>
                    <Link to={'/login'}><p>Login here</p></Link>
                </div>
                {error && <p className='register-error'>{error}</p>}
            </div>
        </div>
    );
}

export default Register;
