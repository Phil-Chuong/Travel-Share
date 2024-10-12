const pool = require('../DB/db');

class Post {
    //GET REQUEST
    static async getAllPosts() {
        const query = 'SELECT * FROM posts ORDER BY created DESC';
        try {
            const result = await pool.query(query);
            console.log('query result:', result.rows);

            // Format image_path correctly before sending the response
            const posts = result.rows.map(post => {
                // Check if the image_path contains multiple paths, and split it into an array
                if (post.image_path) {
                    post.image_path = post.image_path.includes(',')
                        ? post.image_path.replace(/"/g, '').split(',').map(path => path.trim())
                        : [post.image_path.trim()]; // Ensure it is always an array
                } else {
                    post.image_path = []; // No images, return an empty array
                }
                return post;
            });

            return posts;
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
        const query = 'SELECT * FROM posts WHERE user_id = $1 ORDER BY created DESC';
        try {
            const result = await pool.query(query, [user_id]);
            // Format image_path correctly before sending the response
            const posts = result.rows.map(post => {
                // Check if the image_path contains multiple paths, and split it into an array
                if (post.image_path) {
                    post.image_path = post.image_path.includes(',')
                        ? post.image_path.replace(/"/g, '').split(',').map(path => path.trim())
                        : [post.image_path.trim()]; // Ensure it is always an array
                } else {
                    post.image_path = []; // No images, return an empty array
                }
                return post;
            });
            
            return posts;
        } catch (error) {
            console.error('Error fetching post by user ID', error.message);
            throw error;
        }
    }

    static async getPostByCountryId(country_id) {
        const query = 'SELECT * FROM posts WHERE country_id = $1 ORDER BY created DESC';
        try {
            const result = await pool.query(query, [country_id]);

            // Format image_path correctly before sending the response
            const posts = result.rows.map(post => {
                // Check if the image_path contains multiple paths, and split it into an array
                if (post.image_path) {
                    post.image_path = post.image_path.includes(',')
                        ? post.image_path.replace(/"/g, '').split(',').map(path => path.trim())
                        : [post.image_path.trim()]; // Ensure it is always an array
                } else {
                    post.image_path = []; // No images, return an empty array
                }
                return post;
            });
            
            return posts;
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
    static async createPost(user_id, content, image_path, country_id, title) {
        const query = 'INSERT INTO posts (user_id, content, image_path, country_id, title) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        try {
            const result = await pool.query(query, [user_id, content, image_path ? image_path : null, country_id, title])
            const newPost = result.rows[0];
            return newPost;
        } catch (error) {
            console.error('Error creating new post for user', error.message);
            throw error;
        }
    }


    //PULL REQUEST - change like states
    static async addLike(postId) {
        const query = 'UPDATE posts SET post_likes = post_likes + 1 WHERE id = $1 RETURNING *';
        try {
            const result = await pool.query(query, [postId]);
            const updatedPost = result.rows[0]; // Get the updated post with new like count
            return updatedPost; // Return the updated post
        } catch (error) {
            console.error('Error adding like to post', error.message);
            throw error;
        }
    }


    //DELETE REQUEST - Delete a post
    // static async deletePostById(id) {
    //     const query = 'DELETE FROM posts WHERE id = $1';
    //     try {
    //         const result = await pool.query(query, [id]);
    //         // Return a success message or status
    //         return { message: `Post with ID ${id} deleted successfully.` };
    //     } catch (error) {
    //         console.error('Error deleting post by ID');
    //         throw error;
    //     }
    // }

    // DELETE REQUEST - Delete a post along with associated comments and replies
    static async deletePostById(id) {
        const deleteRepliesQuery = 'DELETE FROM replies WHERE comment_id IN (SELECT id FROM comments WHERE post_id = $1)';
        const deleteCommentsQuery = 'DELETE FROM comments WHERE post_id = $1';
        const deletePostQuery = 'DELETE FROM posts WHERE id = $1';

        try {
            // Delete replies associated with comments of the post
            await pool.query(deleteRepliesQuery, [id]);

            // Delete comments associated with the post
            await pool.query(deleteCommentsQuery, [id]);

            // Finally, delete the post itself
            const result = await pool.query(deletePostQuery, [id]);

            // Check if a post was deleted (rowCount will be greater than 0 if successful)
            if (result.rowCount === 0) {
                return null; // Post not found
            }

            return { message: `Post with ID ${id} deleted successfully.` };
        } catch (error) {
            console.error('Error deleting post by ID:', error);
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