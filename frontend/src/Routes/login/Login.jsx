import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { jwtDecode as jwt_decode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr';
import './Login.css';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        /* global google */
        if (typeof google !== 'undefined') {
            google.accounts.id.initialize({
                // client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                client_id: process.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleGoogleLogin
            });

            google.accounts.id.renderButton(
                document.getElementById('googleSignIn'),
                { theme: "outline", size: "large" }
            );
        } else {
            console.error("Google API not loaded");
        }

    }, []);

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            console.log("Encoded JWT ID token: ", credentialResponse);
            const { credential } = credentialResponse;

            if (!credential) {
                throw new Error('Missing credential');
            }

            const response = await axios.post('/googleAuthentication/google-login', { token: credential });
            console.log('Backend response:', response.data);

            // Extract userId from the token or user object
            const userId = response.data.user.id;
            const { accessToken, refreshToken} = response.data;

            console.log('Received accessToken:', accessToken);
            console.log('Received refreshToken:', refreshToken);
            console.log('Received userId:', userId );

            if (accessToken && refreshToken && userId) {
                // Store tokens and userId in localStorage (or state management if applicable)
                localStorage.setItem('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('userId', userId);

                console.log('Navigating to mypage');
                navigate('/mypage');
              } else {
                setError('Missing data from server response');
              }
            } catch (error) {
              setError('Google login failed.');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/authentication/login', { email, password });

            // Store JWT in local storage
            const { accessToken, user } = response.data;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('userId', user.id); 
            console.log('Stored userId:', localStorage.getItem('userId'));

            console.log('Token:', accessToken);
            console.log('User ID:', user.id); 

            navigate('/mypage');
        } catch (error) {
            setError('Invalid credentials');
            console.error('Login error:', error);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <p className='login-titleHeader'>Travel-Share</p>
                <div className='login-logo'>
                    <AirplaneTilt size={58} color="red" />
                </div>
                <h2>Login</h2>
                <div className='loginform-container'>
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
                </div>
                
                <div id='googleSignIn'></div>
                <div className='link-register'>
                    <Link to={'/register'}><p>Create Account</p></Link>
                </div>
                {error && <p className='login-error'>{error}</p>}

            </div>
        </div>
    );
}

export default Login;
