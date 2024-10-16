const express = require('express');
const router = express.Router();
const Country = require('../models/Country');
// const { authenticateToken } = require('../services/authenticateToken');

//GET routes
router.get('/', async (req, res) => {
  console.log('Fetching countries...');
    try {
        const countries = await Country.getAllCountries()
        res.json(countries);
    } catch (error) {
        console.error('Error fetching countries', error.message);
        res.status(500).send({ error: 'Error fetching countries'})
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const country = await Country.getCountryById(id);
        res.json(country);
    } catch  (error) {
        console.error('Error fetching country by ID', error.message);
        res.status(500).send({error: 'Error fetching country by ID'});
    }
});

//POST routes
router.post('/', async (req, res) => {
    const { country_name } = req.body;
    try {
        const newCountry = await Country.createCountry(country_name);
        res.status(201).json(newCountry);
    } catch (error) {
        console.error('Error adding new country', error.message);
        res.status(500).send({error: 'Error adding new country'});
    }
});

module.exports = router;