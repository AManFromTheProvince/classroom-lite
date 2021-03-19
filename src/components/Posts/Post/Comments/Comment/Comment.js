import React from 'react';
import style from './Comment.module.css';

const comment = (props) => {

    let styleClass = style.SmallComment;
    let headerClass = style.SmallHeader;

    if (props.big) {
        styleClass = style.BigComment;
        headerClass = style.BigHeader
    }

    return (
        <div className={styleClass}>
            <div className={headerClass}>
                <h4>{props.poster}</h4>
                <p>{props.date}</p>
            </div>
            <p>{props.body}</p>
        </div>
    );
}

export default comment;