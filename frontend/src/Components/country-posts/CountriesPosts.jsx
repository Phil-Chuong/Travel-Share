import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import './CountriesPosts.css';
import { ChatCentered, Heart, IdentificationCard, SmileyXEyes } from '@phosphor-icons/react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import Comments from '../comment/Comments';
import { useParams } from 'react-router-dom';

function CountriesPosts() {
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
    const { countryId } = useParams(); 

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchPostsByCountry = async () => {
            try {
                const [postsResponse, countriesResponse, usersResponse, commentsResponse] = await Promise.all([
                    axios.get(`/posts/country/${countryId}`),
                    axios.get('/countries'),
                    axios.get('/users'),
                    axios.get('/comments')
                ]);
                setPosts(postsResponse.data);
                setCountries(countriesResponse.data || []);
                setUsers(usersResponse.data);
                setComments(commentsResponse.data);
                //console.log("Fetched countries:", countriesResponse.data);

                const initialLikes = {};
                postsResponse.data.forEach(post => {
                    initialLikes[post.id] = post.post_likes || 0;
                });
                setLikes(initialLikes);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setPosts([]);
                } else {
                    setError('Failed to fetch data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPostsByCountry();
    }, [countryId]);

    const getCountryName = (country_id) => {
        //console.log("Country ID passed:", country_id);
        const country = countries.find(country => country.id === Number(country_id));
        //console.log("Fetched Countries", countries)
        //console.log("Matched country:", country);

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
            const response = await axios.post(`/comments`, {
                post_id: postId,
                parent_comment_id: null,
                comment_content: newComment[postId],
                user_id: userId // Assuming you have a logged-in user
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
                user_id: userId // Assuming you have a logged-in user
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

    if (loading) {
        return <div><FontAwesomeIcon icon={faSync} spin size="3x" /></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='countrypost-container'>
            <div className='countryname-header'>
                <h3 className='countryname'>{getCountryName(Number(countryId))}</h3>
            </div>

            <ul className="countrypost-list">
                {posts.length === 0 ? (
                    <div className='nopost-country'>
                        <SmileyXEyes size={48} />
                        <p>No posts found for this country!</p>
                    </div>
                ) : (
                    posts.map((post) => {
                        const topLevelComments = getTopLevelCommentsForPost(post.id);
                        const currentLikes = likes[post.id] || 0; 

                        return (
                            <li key={post.id} className="countrypost-item">
                                <div className='countrypost-info'>
                                    <div className='countryleft-info'>
                                        <h3><IdentificationCard size={24} /></h3>
                                        <div className='countrypost-username'>
                                            {getUsername(post.user_id)}
                                        </div>
                                    </div>
                                    {/* <div className='mainpost-country'>
                                    <h3>Location:                         
                                        {getCountryName(post.country_id)}                                 
                                    </h3>
                                    </div> */}
                                    
                                </div>

                                <div className="countrypost-title">
                                    <h4>{post.title}</h4>
                                </div>

                                <div className='maincountryphoto-container'>
                                    <div className='countryphoto-container'>
                                        {post.image_path.map((image, index) => (
                                            <img 
                                            className="countrypost-image"
                                            key={index} 
                                            src={`http://localhost:4000${image}`} 
                                            alt={post.title} 
                                            style={{ minWidth: '261px'}}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="countrypost-content">
                                    <p>{post.content}</p>
                                </div>

                                <div className='comment-container'>
                                    <div className='comment-section' onClick={() => toggleCommentsVisibility(post.id)}>
                                        <ChatCentered size={24} />
                                        {commentCount(post.id) > 0 && <span>{commentCount(post.id)}</span>}
                                    </div>
                                    <div className='create-section'>{formatDistanceToNow(parseISO(post.created), { addSuffix: true })}</div>
                                    <div className='likes-section' onClick={() => handleLikePost(post.id)}>
                                        <Heart size={24} />
                                        {currentLikes > 0 && <span>{currentLikes}</span>}
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
                            </li>
                        );
                    })
                )}
            </ul>            
        </div>
    );
}

export default CountriesPosts;
