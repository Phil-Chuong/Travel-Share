const express = require('express');
const router = express.Router();
const Reply = require('../models/Reply');

// Helper function to nest replies
const nestReplies = (replies) => {
    const replyMap = {};
    
    // Create a map of reply ids to their corresponding reply objects
    replies.forEach(reply => {
        reply.replies = []; // Initialize the nested replies array for each reply
        replyMap[reply.id] = reply;
    });

    const nestedReplies = [];
    
    // Populate the replies with their nested children
    replies.forEach(reply => {
        if (reply.parent_reply_id) {
            // If the reply has a parent, add it to the parent's 'replies' array
            const parentReply = replyMap[reply.parent_reply_id];
            if (parentReply) {
                parentReply.replies.push(reply);
            }
        } else {
            // If the reply has no parent, it's a top-level reply
            nestedReplies.push(reply);
        }
    });
    
    return nestedReplies;
};

//GET routes
router.get('/', async (req, res) => {
    console.log('Fetching nested replies...');
    try {
        // Fetch all replies from the database
        const replies = await Reply.getAllReplies();

        // Nest the replies by parent_reply_id
        const nestedReplies = nestReplies(replies);

        res.json(nestedReplies);
    } catch (error) {
        console.error('Error fetching nested replies', error);
        res.status(500).json({ error: 'Error fetching nested replies' }); 
    }
});

module.exports = router;