import React from 'react';
import Card from '../../UI/Card/Card';
import Comment from './Comments/Comment/Comment';
import Comments from './Comments/Comments';

const post = (props) => {
    
    // since a "normal" post and a comment have the same structure, i opted to use Comments instead but
    // i used "big" to differentiate between a normal post and a comment

    let cardStyle = {
        width: "60%",
        margin: "1em auto"
    }

    return (
        <Card cardStyle={cardStyle}>
            <Comment 
                big
                poster={props.poster}
                body={props.body}
                date={props.date}
            />
            <h3 style={{color: "#888"}}>{props.comments.length} Comments</h3>
            <Comments comments={props.comments}/>
            
        </Card>
    );
}

export default post;