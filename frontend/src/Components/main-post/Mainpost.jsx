import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mainpost.css';
import { ChatCentered, Heart } from '@phosphor-icons/react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Comments from '../comment/Comments';

function Mainpost() {
    const [posts, setPosts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [visibleCommentsPostId, setVisibleCommentsPostId] = useState(null);
    const [newComment, setNewComment] = useState({});
    const [newReply, setNewReply] = useState({});
    const [likes, setLikes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsResponse, countriesResponse, usersResponse, commentsResponse] = await Promise.all([
                    axios.get('http://localhost:4000/posts'),
                    axios.get('http://localhost:4000/countries'),
                    axios.get('http://localhost:4000/users'),
                    axios.get('http://localhost:4000/comments')
                ]);
                setPosts(postsResponse.data);
                setCountries(countriesResponse.data);
                setUsers(usersResponse.data);
                setComments(commentsResponse.data);

                // Initialize likes state with current likes from posts
                const initialLikes = {};
                postsResponse.data.forEach(post => {
                    initialLikes[post.id] = post.post_likes || 0; // Set initial likes for each post
                });
                setLikes(initialLikes);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getCountryName = (country_id) => {
        const country = countries.find(country => country.id === country_id);
        return country ? country.country_name : 'Unknown Country';
    };

    const getUsername = (user_id) => {
        const user = users.find(user => user.id === user_id);
        return user ? user.username : 'Unknown User';
    };

    const handleAddComment = async (e, postId) => {
        e.preventDefault();
        if (!newComment[postId]) return;

        try {
            const response = await axios.post(`http://localhost:4000/comments`, {
                post_id: postId,
                parent_comment_id: null,
                comment_content: newComment[postId],
                user_id: 4 // Assuming you have a logged-in user
            });
            setComments(prevComments => [...prevComments, response.data]);
            setNewComment(prev => ({ ...prev, [postId]: '' }));
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    const handleAddReply = async (e, commentId, postId) => {
        e.preventDefault();
        if (!newReply[commentId]) return;

        try {
            const response = await axios.post(`http://localhost:4000/comments`, {
                post_id: postId,
                parent_comment_id: commentId,
                comment_content: newReply[commentId],
                user_id: 4 // Assuming you have a logged-in user
            });
            setComments(prevComments => [...prevComments, response.data]);
            setNewReply(prev => ({ ...prev, [commentId]: '' }));
        } catch (err) {
            console.error('Error adding reply:', err);
        }
    };

    // New function to handle liking posts
    const handleLikePost = async (postId) => {
        try {
            // Send a request to update the like count in the backend
            await axios.post(`http://localhost:4000/posts/${postId}/like`);
    
            // Update local state after successfully liking the post
            setLikes(prevLikes => ({
                ...prevLikes,
                [postId]: (prevLikes[postId] || 0) + 1 // Increment likes for this post
            }));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const toggleCommentsVisibility = (post_id) => {
        setVisibleCommentsPostId(visibleCommentsPostId === post_id ? null : post_id);
    };

    const getTopLevelCommentsForPost = (post_id) => {
        return comments.filter(comment => comment.post_id === post_id && comment.parent_comment_id === null);
    };

    const commentCount = (post_id) => {
        return comments.filter(comment => comment.post_id === post_id).length;
    };

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='mainpost-container'>
            <h3>Main Posts</h3>
            <ul className="mainpost-list">
                {posts.map((post) => {
                    const topLevelComments = getTopLevelCommentsForPost(post.id);
                    const currentLikes = likes[post.id] || 0; // Get current likes for this post

                    return (
                        <li key={post.id} className="mainpost-item">
                            <div className='mainpost-info'>
                                <div className='mainpost-username'>
                                    <h3>Traveller: {getUsername(post.user_id)}</h3>
                                </div>
                                <div className='mainpost-country'>
                                    <h3>Location: {getCountryName(post.country_id)}</h3>
                                </div>
                            </div>

                            <div className="mainpost-title">
                                <h4>{post.title}</h4>
                            </div>

                            <div className='mainphoto-container'>
                                {post.image_path.map((image, index) => (
                                    <img key={index} src={`http://localhost:4000${image}`} alt={post.title} style={{ maxWidth: '300px', marginRight: '10px' }} />
                                ))}
                            </div>

                            <div className="mainpost-content">
                                <p>{post.content}</p>
                            </div>

                            <div className='comment-container'>
                                <div className='comment-section' onClick={() => toggleCommentsVisibility(post.id)}>
                                    <ChatCentered size={24} />
                                    {commentCount(post.id) > 0 && <span>{commentCount(post.id)}</span>}
                                </div>
                                <div className='create-section'>{formatDistanceToNow(parseISO(post.created), { addSuffix: true })}</div>
                                <div className='likes-section' onClick={() => handleLikePost(post.id)}>
                                    {currentLikes > 0 && <span>{currentLikes}</span>} {/* Show current like count */}
                                    <Heart size={24} />
                                    </div>
                            </div>

                            {visibleCommentsPostId === post.id && (
                                <div className='comments-section'>
                                    <div className="comment-input-container">
                                        <form onSubmit={(e) => handleAddComment(e, post.id)}>
                                            <textarea
                                                value={newComment[post.id] || ''}
                                                onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                                                placeholder="Leave a comment..."
                                                rows="2"
                                            />
                                            <button type="submit">Comment</button>
                                        </form>
                                    </div>
                                    {topLevelComments.length > 0 ? (
                                        topLevelComments.map(comment => (
                                            <div key={`comment-${comment.id}`}>
                                                <Comments
                                                    comment={comment}
                                                    allComments={comments}
                                                    getUsername={getUsername}
                                                    postId={post.id}
                                                    setComments={setComments}
                                                    newReply={newReply}
                                                    setNewReply={setNewReply}
                                                    handleAddReply={handleAddReply}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet.</p>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Mainpost;
