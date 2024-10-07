import React from 'react';
import Comments from '../comment/Comments';
import './Replies.css';

function Replies({ commentId, allComments, getUsername, postId, setComments, newReply, setNewReply, handleAddReply }) {
    const getReplies = (commentId) => {
        return allComments.filter(reply => reply.parent_comment_id === commentId);
    };

    const replies = getReplies(commentId);

    return (
        <div className="replies">
            {replies.map(reply => (
                <Comments
                    key={`reply-${reply.id}`} // Ensure uniqueness
                    comment={reply}
                    allComments={allComments}
                    getUsername={getUsername}
                    postId={postId}
                    setComments={setComments}
                    newReply={newReply}
                    setNewReply={setNewReply}
                    handleAddReply={handleAddReply}
                />
            ))}
        </div>
    );
}


export default Replies;
