import React from 'react';
import Post from './Post/Post';

const posts = (props) => {

    let listOfPosts = props.posts.map((post, i) => {
        return <Post
            poster={post.poster}
            body={post.body}
            date={post.date}
            comments={post.comments}
            key={post.classId + i}
        />
    });

    return(
        <div>
            {listOfPosts}
        </div>
    );
}

export default posts;