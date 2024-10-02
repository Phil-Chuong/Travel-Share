const pool = require('../DB/db');


class Comment {
    //GET REQUEST
    static async getAllComments() {
        const query = 'SELECT * FROM comments';
        try {
            const result = await pool.query(query);
            console.log('query result:', result.rows);
            return result.rows;
        } catch (error) {
            console.error('Error fetching all commments:', error.message);
            throw error;
        }
    };

    static async getCommentById(id) {
        const query = 'SELECT * FROM comments WHERE id = $1';
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching comment by ID', error.message);
            throw error;
        }
    }

    static async getCommentByPostId(post_id) {
        const query = 'SELECT * FROM comments WHERE post_id = $1';
        try {
            const result = await pool.query(query, [post_id]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching comment by post ID', error.message);
            throw error;
        }
    }

    static async getCommentByUserId(user_id) {
        const query = 'SELECT * FROM comments WHERE user_id = $1';
        try {
            const result = await pool.query(query, [user_id]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching comments by user ID', error.message);
            throw error;
        }
    }

    //POST REQUEST - Creating a comment
    static async createComment(post_id, user_id, comment_content) {
        const query = 'INSERT INTO comments (post_id, user_id, comment_content) VALUES ($1, $2, $3) RETURNING *';
        try {
            const result = await pool.query(query, [post_id, user_id, comment_content])
            const newComment = result.rows[0];
            return newComment;
        } catch (error) {
            console.error('Error creating new comment for post', error.message);
            throw error;
        }
    }

    //DELETE REQUEST - Delete a post
    static async deleteCommentById(id) {
        const query = 'DELETE FROM comments WHERE id = $1';
        try {
            const result = await pool.query(query, [id]);
            // Return a success message or status
            return { message: `Comment with ID ${id} deleted successfully.` };
        } catch (error) {
            console.error('Error deleting comment by ID');
            throw error;
        }
    }

}

module.exports = Comment;