import React from 'react';
import style from './Card.module.css';

const card = (props) => {
    return (
        <div className={style.Card} style={props.cardStyle}>
            {props.children}
        </div>
    );
}

export default card;