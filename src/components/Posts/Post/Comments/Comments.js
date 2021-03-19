import React from 'react';
import Comment from './Comment/Comment';

const comments = (props) => {

    const listOfComments = props.comments.map(comment => {
        return <Comment
            poster={comment.poster}
            body={comment.body}
            date={comment.date}
        />
    });
    
    return(
        <>
            {listOfComments}
        </>
    );
}

export default comments;