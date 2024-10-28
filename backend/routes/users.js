const express = require('express');
const router = express.Router();
const User = require('../models/User');
//const { authenticateToken } = require('../services/authenticateToken');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users from the database
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
//GET routes
router.get('/', async (req, res) => {
    console.log('Fetching users....');
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users', error);
        res.status(500).json({ error: 'Error fetching users' }); 
    }
});


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching users by ID: ${id}`);
    try {
        const user = await User.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user by ID');
        res.status(500).send({error: 'Error fetching user by ID'});
    }
})


//POST routes
router.post('/', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    try {
        if (!firstname || !lastname || !username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.createUser(firstname, lastname, username, email, password);
        res.json(user);
    } catch (error) {
        console.error('Error registering new user', error);
        res.status(500).send({error: 'Error registering new user'});
    }
})

//PUT/UPDATE routes
router.put('/edituser/:id', async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, username, email, location } = req.body;

    try {
        // Ensure the user exists
        const result = await User.updateUsersInfo(firstname, lastname, username, email, location, id);
        
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result);  // Return the updated user data
    } catch (error) {
        console.error('Error editing users info', error);
        res.status(500).send({error: 'Error editing users info'});
    }
});


//DELETE routes
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await User.deleteUserById(userId);
        if (!result || result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found or already deleted' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error deleting user by ID');
        res.status(500).send({error: 'Error deleting user by ID'});
    }
})


module.exports = router;