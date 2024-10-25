// const express = require('express');
// const router = express.Router();
// const pool = require('../DB/db');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const { OAuth2Client } = require('google-auth-library');

// const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);
// const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET

// // POST Route to handle Google login
// router.post('/google-login', async (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*"); // Allow any origin to access this endpoint
//     res.header("Access-Control-Allow-Methods", "POST, OPTIONS"); // Allow POST and OPTIONS methods
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow these headers
    
//     try {
//         const { token } = req.body;  // Google JWT sent from frontend
//         console.log('Received token:', token); // Log the received token

//         if (!token) {
//             throw new Error('ID Token is missing');
//         }

//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: process.env.VITE_GOOGLE_CLIENT_ID,
//         });

//         // Check if user exists in DB or create a new one
//         console.log('Google ticket:', ticket); // Log the Google ticket
//         const googleUser = ticket.getPayload();
//         console.log('Google payload', googleUser);

//         const { sub: userId, email, name } = googleUser;
//         const fullName = name.split(' ') // Assuming name is a full name
//         const [firstname, lastname] = fullName.length > 1 ? [fullName[0], fullName.slice(1).join(' ')] : [fullName[0], null];

//         // Check if a user already exists with the same email
//         let user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//         if (user.rows.length === 0) {
//             // User does not exist, create new one
//             const defaultPassword = await bcrypt.hash('defaultpassword', 10);

//             const newUser = await pool.query(
//                 'INSERT INTO users (firstname, lastname, google_id, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//                 [firstname, lastname, name, email, defaultPassword]
//             );
//             user = newUser;
//         }

//         const dbUser = user.rows[0];

//         // Generate JWT token
//         const accessToken  = jwt.sign({ userId: dbUser.id }, JWT_SECRET, {
//         expiresIn: '1h',
//         });
  
//         const refreshToken = jwt.sign({ userId: dbUser.id }, JWT_SECRET, {
//         expiresIn: '7d',
//         });


//         // Send the user data and tokens back to the frontend
//         res.status(200).json({
//             message: 'Login successful',
//             user: {
//                 id: dbUser.id,
//                 firstname: dbUser.firstname,
//                 email: dbUser.email,
//                 picture: dbUser.picture,
//             },
//             accessToken,
//             refreshToken
//         });
//     } catch (error) {
//         console.error('Error during Google login:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// module.exports = router;