const pool = require('../DB/db');

class Post {
    //GET REQUEST
    static async getAllPosts() {
        const query = 'SELECT * FROM posts';
        try {
            const result = await pool.query(query);
            console.log('query result:', result.rows);
            return result.rows;
        } catch (error) {
            console.error('Error fetching all posts:', error.message);
            throw error;
        }
    }

    static async getPostById(id) {
        const query = 'SELECT * FROM posts WHERE id = $1';
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching post by ID', error.message);
            throw error;
        }
    }

    static async getPostByUserId(user_id) {
        const query = 'SELECT * FROM posts WHERE user_id = $1';
        try {
            const result = await pool.query(query, [user_id]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching post by user ID', error.message);
            throw error;
        }
    }

    static async getPostByCountryId(country_id) {
        const query = 'SELECT * FROM posts WHERE country_id = $1';
        try {
            const result = await pool.query(query, [country_id]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching post by country', error.messge);
            throw error;
        }
    }

    static async getAllPostByDate(created) {
        const query = 'SELECT * FROM posts WHERE created = $1';
        try {
            const result = await pool.query(query, [created]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching posts by date', error.message);
            throw error;
        } 
    }

    //POST REQUEST - Creating a post
    static async createPost(user_id, content, image_path, country_id) {
        const query = 'INSERT INTO posts (user_id, content, image_path, country_id) VALUES ($1, $2, $3, $4) RETURNING *';
        try {
            const result = await pool.query(query, [user_id, content, image_path, country_id])
            const newPost = result.rows[0];
            return newPost;
        } catch (error) {
            console.error('Error creating new post for user', error.message);
            throw error;
        }
    }


    //DELETE REQUEST - Delete a post
    static async deletePostById(id) {
        const query = 'DELETE FROM posts WHERE id = $1';
        try {
            const result = await pool.query(query, [id]);
            // Return a success message or status
            return { message: `Post with ID ${id} deleted successfully.` };
        } catch (error) {
            console.error('Error deleting post by ID');
            throw error;
        }
    }

    // Update post images for a specific post ID
    static async updatePostImages(post_id, updatedImagePaths) {
        const query = `UPDATE posts SET image_path = $1 WHERE id = $2 RETURNING *`;
        const values = [JSON.stringify(updatedImagePaths), post_id];  // Store as JSON in DB
        try {
            const result = await pool.query(query, values);
            return result.rows[0];  // Return the updated post
        } catch (error) {
            console.error('Error updating post images:', error.message);
            throw error;
        }
    }
}

module.exports = Post;