const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

//GET routes
router.get('/', async (req, res) => {
    console.log('Fetching comments....');
    try {
        const comments = await Comment.getAllComments();
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments', error);
        res.status(500).json({ error: 'Error fetching comments' }); 
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching comments by ID: ${id}`);
    try {
        const comment = await Comment.getCommentById(id);
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).send({ error: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error fetching comments by ID', error);
        res.status(500).send({error: 'Error fetching comments by ID'});
    }
});

router.get('/posts/:post_id', async (req, res) => {
    const { post_id } = req.params;
    console.log(`Fetching comments by post ID: ${post_id}`);
    try {
        const comments = await Comment.getCommentByPostId(post_id);
        if (comments.length > 0) {
            res.json(comments);
        } else {
            res.status(404).send({ error: 'No comments found for this post' });
        }
    } catch (error) {
        console.error('Error fetching comments by post ID', error);
        res.status(500).send({error: 'Error fetching comments by post ID'});
    }
});

router.get('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log(`Fetching comments by user ID: ${user_id}`);
    try {
        const comments = await Comment.getCommentByUserId(user_id);
        if (comments.length > 0) {
            res.json(comments);
        } else {
            res.status(404).send({ error: 'No comments found for this user' });
        }
    } catch (error) {
        console.error('Error fetching comments by user ID', error);
        res.status(500).send({error: 'Error fetching comments by user ID'});
    }
});

//POST routes
router.post('/', async (req, res) => {
    const {post_id, user_id, comment_content, parent_comment_id} = req.body;
    try {
        const comment = await Comment.createComment(post_id, user_id, comment_content, parent_comment_id);
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating new comment', error);
        res.status(500).send({error: 'Error creating new comment'});
    }
})

//DELETE routes
router.delete('/:id', async (req, res) => {
    const commentId = req.params.id;
    try {
        const result = await Comment.deleteCommentById(commentId);
        if (result) {
            res.json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).send({ error: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error deleting comment by ID');
        res.status(500).send({error: 'Error deleting comment by ID'});
    }
})


module.exports = router;