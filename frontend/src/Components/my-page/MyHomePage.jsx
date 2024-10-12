import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import './MyHomePage.css';
import { ChatCentered, Heart, Trash, Pen, IdentificationCard, Globe } from '@phosphor-icons/react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Comments from '../comment/Comments';
import { useParams } from 'react-router-dom';
import AddNewPost from '../addnewpost/AddNewPost';


function MyHomePage() {
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
    const { user_id } = useParams();
    const [showAddPostForm, setShowAddPostForm] = useState(false);

    useEffect(() => {
        const fetchPostsByUserId = async () => {
            try {
                const [postsResponse, countriesResponse, usersResponse, commentsResponse] = await Promise.all([
                    axios.get(`/posts/users/${4}`),
                    axios.get('/countries'),
                    axios.get('/users'),
                    axios.get('/comments')
                ]);
                setPosts(postsResponse.data);
                setCountries(countriesResponse.data);
                setUsers(usersResponse.data);
                setComments(commentsResponse.data);
                // console.log("Fetched countries:", postsResponse.data);

                const initialLikes = {};
                postsResponse.data.forEach(post => {
                    initialLikes[post.id] = post.post_likes || 0;
                });
                setLikes(initialLikes);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchPostsByUserId();
    }, []);

    const getCountryName = (country_id) => {
        // console.log("Country ID passed:", country_id);
        const country = countries.find(country => country.id === country_id);
        // console.log("Matched country:", country);
        return country ? country.country_name : 'Unknown Country';
    };

    const getUsername = (user_id) => {
        const user = users.find(user => user.id === Number(4));
        return user ? user.username : 'Unknown User';
    };

    const handlePostCreated = (newPost) => {
        if (newPost) {
            console.log('Post Created:', newPost);
            setPosts((prevPosts) => [...prevPosts, newPost]); // Update posts when a new one is created
        }
        setShowAddPostForm(false); // Hide the form after submission
    };

    const handleAddComment = async (e, postId) => {
        e.preventDefault();
        if (!newComment[postId]) return;

        try {
            const response = await axios.post(`/comments`, {
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
            const response = await axios.post(`/comments`, {
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

    const handleLikePost = async (postId) => {
        try {
            const response = await axios.post(`/posts/${postId}/like`);

            // Update likes state with the latest count from the backend
            const updatedLikes = response.data.post_likes;
            setLikes(prevLikes => ({
                ...prevLikes,
                [postId]: updatedLikes
            }));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const toggleCommentsVisibility = (post_id) => {
        setVisibleCommentsPostId(visibleCommentsPostId === post_id ? null : post_id);
    };

    const getTopLevelCommentsForPost = useMemo(() => (post_id) => {
        return comments.filter(comment => comment.post_id === post_id && comment.parent_comment_id === null);
    }, [comments]);

    const commentCount = useMemo(() => (post_id) => {
        return comments.filter(comment => comment.post_id === post_id).length;
    }, [comments]);


    // Handle deleting a post
    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`/posts/${postId}`);
            // Remove the deleted post from the UI
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
            setError('Failed to delete post');
        }
    };


    if (loading) {
        return <div>Loading posts for this country...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='userpost-container'>
            <div className='header-container'>
                <h3 className='username'>{getUsername(Number(user_id))}</h3>
                <button className='addPost-button' onClick={() => setShowAddPostForm((prev) => !prev)}><Pen size={22} /></button>
            </div>
                {showAddPostForm && <AddNewPost onPostCreated={handlePostCreated} userId={4} />}
            
            <ul className="userpost-list">
                {posts.map((post) => {
                    const topLevelComments = getTopLevelCommentsForPost(post.id);
                    const currentLikes = likes[post.id] || 0; 

                    return (
                        <li key={post.id} className="userpost-item">
                            <div className='userpost-info'>
                                <div className='userpost-username'>
                                    <h3><IdentificationCard size={24} /> {getUsername(post.user_id)}</h3>
                                </div>
                                <div className='mainpost-country'>
                                <h3><Globe size={24} />                         
                                    {getCountryName(post.country_id)}                                 
                                </h3>
                                </div>
                            </div>

                            <div className="countrypost-title">
                                <h4>{post.title}</h4>
                            </div>

                            <div className='myphoto-container'>
                                {post.image_path && Array.isArray(post.image_path) && post.image_path.length > 0 && (
                                    <div className='myimage-container'>
                                        {post.image_path.map((image, index) => (
                                            <img 
                                                className="mypost-image"
                                                key={index} 
                                                src={`http://localhost:4000${image.trim()}`} 
                                                alt={post.title} 
                                                style={{ minWidth: '200px' }} 
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="countrypost-content">
                                <p>{post.content}</p>
                            </div>

                            <div className='my-comment-container'>
                                <div className='comment-section' onClick={() => toggleCommentsVisibility(post.id)}>
                                    <ChatCentered size={24} />
                                    {commentCount(post.id) > 0 && <span>{commentCount(post.id)}</span>}
                                </div>
                                <div className='create-section'>{formatDistanceToNow(parseISO(post.created), { addSuffix: true })}</div>
                                <div className='likes-section' onClick={() => handleLikePost(post.id)}>
                                    {currentLikes > 0 && <span>{currentLikes}</span>}
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
                                            <button type="submit" disabled={!newComment[post.id]}>Comment</button>
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

                            {/* Delete Button */}
                            <button className='delete-container'>
                            <Trash size={24} 
                            className="delete-post-button" 
                            onClick={() => handleDeletePost(post.id)}/>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default MyHomePage;
