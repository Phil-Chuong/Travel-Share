import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div>
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
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
