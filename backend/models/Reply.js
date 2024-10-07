const pool = require('../DB/db');

class Reply {
    //GET REQUEST
    static async getAllReplies() {
        const query = 'SELECT * FROM repliess';
        try {
            const result = await pool.query(query);
            console.log('query result:', result.rows);
            return result.rows;
        } catch (error) {
            console.error('Error fetching all replies:', error.message);
            throw error;
        }
    };

     // GET REQUEST for replies of a specific comment
     static async getRepliesByCommentId(commentId) {
        const query = `
            SELECT * FROM replies
            WHERE comment_id = $1
            ORDER BY created ASC
        `;
        try {
            const result = await pool.query(query, [commentId]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching replies by comment ID:', error.message);
            throw error;
        }
    };

    // GET REQUEST for nested replies (replies to replies)
    static async getRepliesByParentReplyId(parentReplyId) {
        const query = `
            SELECT * FROM replies
            WHERE parent_reply_id = $1
            ORDER BY created ASC
        `;
        try {
            const result = await pool.query(query, [parentReplyId]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching nested replies:', error.message);
            throw error;
        }
    };


    // POST REQUEST to add a new reply to a comment or reply
    static async addReply({ comment_id, parent_reply_id = null, user_id, reply_content }) {
        const query = `
            INSERT INTO replies (comment_id, parent_reply_id, user_id, reply_content)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        try {
            const result = await pool.query(query, [comment_id, parent_reply_id, user_id, reply_content]);
            return result.rows[0];
        } catch (error) {
            console.error('Error adding reply:', error.message);
            throw error;
        }
    };

    // PUT REQUEST to edit a reply
    static async updateReply(reply_id, reply_content) {
        const query = `
            UPDATE replies
            SET reply_content = $1, updated_at = NOW()
            WHERE id = $2
            RETURNING *
        `;
        try {
            const result = await pool.query(query, [reply_content, reply_id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating reply:', error.message);
            throw error;
        }
    };


    // DELETE REQUEST to delete a reply (and possibly its children if cascading)
    static async deleteReply(reply_id) {
        const query = `
            DELETE FROM replies
            WHERE id = $1
            RETURNING *
        `;
        try {
            const result = await pool.query(query, [reply_id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting reply:', error.message);
            throw error;
        }
    };

}

module.exports = Reply;