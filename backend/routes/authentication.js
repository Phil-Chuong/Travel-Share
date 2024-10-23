require('dotenv').config();
const express = require('express');
const router = express.Router();
const pool = require('../DB/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("Token secrets are not defined in the environment variables.");
}

// Generate Access Token
function generateAccessToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email }, 
        ACCESS_TOKEN_SECRET, 
        { expiresIn: '15m' }
    );
}

// Generate Refresh Token
function generateRefreshToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email }, 
        REFRESH_TOKEN_SECRET, 
        { expiresIn: '7d' } // Refresh tokens usually live for a longer period
    );
}

// Refresh token route
router.post('/refresh', (req, res) => {
    const refreshToken = req.body.token;
    
    if (!refreshToken) {
        return res.status(401).json({ error: 'Unauthorized, no token provided' });
    }
    
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden, invalid token' });
        }
        
        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    });
});


// Register route
router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, username, location, email, password } = req.body;

        // Check if all fields are provided
        if (!firstname || !lastname || !username  || !location || !email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Username or email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const query = 'INSERT INTO users (firstname, lastname, username, location, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const result = await pool.query(query, [firstname, lastname, username, location, email, hashedPassword]);

         // Extract the newly created user
        const newUser = result.rows[0];

        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        // Respond with the new user data (excluding the password) and tokens
        return res.status(201).json({
            message: 'User registered successfully',
            newUser: {
                id: newUser.id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username,
                location: newUser.location,
                email: newUser.email
            },
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Error registering new user', error);
        res.status(500).json({ error: 'Error registering new user' });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the user by email
        const query = 'SELECT * FROM users WHERE email = $1';
        const userInput =  await pool.query(query, [email]);
        
        // Check if user exists
        if (userInput.rows.length === 0) {
            console.log('Invalid email or password');
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const user = userInput.rows[0];

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Invalid email or password');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        //const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Respond with user data and token (excluding the password)
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                location: user.location,
                email: user.email
            },
            accessToken, 
            refreshToken
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});


module.exports = router;
    
