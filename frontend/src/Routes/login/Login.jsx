import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/authentication/login', { email, password });

            // Store JWT in local storage
            const { accessToken, user } = response.data;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('userId', user.id); 
            console.log('Stored userId:', localStorage.getItem('userId'));

            console.log('Token:', accessToken); // This looks fine as per your logs
            console.log('User ID:', user.id); // Verify this logs the correct ID

            navigate('/mypage'); // Navigate to the dashboard after login
        } catch (error) {
            setError('Invalid credentials');
            console.error('Login error:', error);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <div className='login-logo'>
                    <AirplaneTilt size={58} color="red" />
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit"><p>Login</p></button>
                </form>
                <div className='link-register'>
                    <Link to={'/register'}><p>Create Account</p></Link>
                </div>
                {error && <p className='login-error'>{error}</p>}

            </div>
        </div>
    );
}

export default Login;
