import React, { useState } from 'react';
import Replies from '../replies/Replies';
import './Comments.css';

function Comment({ comment, allComments, getUsername, postId, setComments, newReply, setNewReply, handleAddReply }) {
    const [isReplying, setIsReplying] = useState(false);

    return (
        <div className="comment">
            <div className="comment-info">
                <span><strong>{getUsername(comment.user_id)}</strong></span>
                <p>{comment.comment_content}</p>
            </div>

            <div className="comment-actions">
                <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
            </div>

            {isReplying && (
                <form onSubmit={(e) => handleAddReply(e, comment.id, postId)}>
                    <textarea
                        value={newReply[comment.id] || ''}
                        onChange={(e) => setNewReply(prev => ({ ...prev, [comment.id]: e.target.value }))}
                        placeholder="Write a reply..."
                        rows="2"
                    />
                    <button className='comment-submit' type="submit">Reply</button>
                </form>
            )}

            {/* Use the Replies component to render replies */}
            <Replies
                commentId={comment.id}
                allComments={allComments}
                getUsername={getUsername}
                postId={postId}
                setComments={setComments}
                newReply={newReply}
                setNewReply={setNewReply}
                handleAddReply={handleAddReply}
            />
        </div>
    );
}

export default Comment;
