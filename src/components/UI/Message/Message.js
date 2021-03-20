import React from 'react';
import style from './Message.module.css';

const message = (props) => {

    let color, accent;
    switch(props.color) {
        case "red":
            color = "#EF9A9A";
            accent = "#B71C1C";
            break;
        case "green":
            color = "#A5D6A7";
            accent = "#1B5E20";
            break;
        default:
            color = "#ffffff";
            accent = "#000000";
    }

    const border = "2px solid " + accent;

    return (
        <div 
        style={{...props.btnStyle, background: color, color: accent, border: border}} 
        className={style.Message}
        >{props.children}</div>
    );
}

export default message;