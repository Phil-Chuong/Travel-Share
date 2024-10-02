const pool = require('../DB/db');

// Fetch all countries
class Country {
    //GET REQUEST
    static async getAllCountries() {
        const query = 'SELECT * FROM countries';
        try {
            const result = await pool.query(query);
            console.log('Query result:', result.rows);
            return result.rows;
        } catch (error) {
            console.error('Error fetching all countries:', error.message);
            throw error;
        }
    }

    static async getCountryById(id) {
        const query = 'SELECT * FROM countries WHERE id = $1';
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching country by ID', error.message);
            throw error;
        }
    }

    //POST REQUEST - creating new country
    static async createCountry(country_name) {
        const query = 'INSERT INTO countries (country_name) VALUES ($1) RETURNING *';
        try {
            const result = await pool.query(query, [country_name]);
            const newCountry = result.rows[0];
            return newCountry;
        } catch (error) {
            console.error('Error adding new country', error.message);
            throw error;
        }
    }

}

module.exports = Country;