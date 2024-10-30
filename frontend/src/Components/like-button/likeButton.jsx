
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart } from '@phosphor-icons/react';
import './likeButton.css';

const LikeButton = ({ postId, initialLikes, userId }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Optionally check if the user has already liked the post on mount
        // For simplicity, let's assume the server sends this with post data or retrieve it otherwise
    }, []);

    const handleLike = async () => {
        try {
            const userId = localStorage.getItem('userId'); // Retrieve userId from local storage or state
            const response = await axios.post(`/posts/${postId}/like`, {
                user_id: userId
            });
            setLikes(response.data.post_likes);
            setLiked(!liked); // Toggle liked state
        } catch (error) {
            console.error("Error liking post:", error);
            alert("There was an error liking the post. Please try again.");
        }
    };

    return (
        <div>
            
            <button onClick={handleLike} style={{ cursor: 'pointer', color: liked ? 'red' : 'black' }}>          
                {liked ? '' : ''}
                <Heart size={24} />
                <span> {likes} </span>
            </button>
        </div>
    );
};

export default LikeButton;
