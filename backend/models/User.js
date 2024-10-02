const pool = require('../DB/db');

class User {
    //GET REQUSET
    static async getAllUsers() {
        const query = 'SELECT * FROM users';
        try {
            const result = await pool.query(query);
            console.log('Query result:', result.rows);
            return result.rows;
        } catch (error) {
            console.error('Error fetching all users:', error.message);
            throw error;
        }
    }

    static async getUserById(id) {
        const query = 'SELECT * FROM users WHERE id = $1';
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching user by ID');
            throw error;
        }
    }

    static async getUserByComments() {
        const query = 'SELECT * FROM comments WHERE user_id = $1';
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error fetching comments by users ID');
            throw error;
        }
    }

    //PUT REQUEST - updating account info
    // static async updateFirstname(userId, newFirstname) {
    //     const query = 'UPDATE users SET firstname = $1 WHERE id = $2 RETURNING *';
    //     try {
    //         const result = await pool.query(query, [newFirstname, userId]);
    //         return result.rows[0];  // Return the updated user
    //     } catch (error) {
    //         console.error('Error updating firstname', error);
    //         throw error;
    //     }
    // }

    //DELETE REQUST - Delete users accounts
    static async deleteUserById(id) {
        const query = 'DELETE FROM users WHERE id = $1;';
        try {
            const result = await pool.query(query, [id]);
            // Return a success message or status
            return { message: `User with ID ${id} deleted successfully.` };
        } catch (error) {
            console.error('Error deleting user by ID');
            throw error;
        }
    }

    
    // Compare hashed password
    // static async comparePassword(user, password) {
    //     try {
    //         return await bcrypt.compare(password, user.password);
    //     } catch (error) {
    //         console.error('Error comparing password:', error.message); // Log error details
    //         throw error;
    //     }
    // }


}

module.exports = User;