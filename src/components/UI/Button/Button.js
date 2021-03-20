import React from 'react';
import style from './Button.module.css';

const button = (props) => {

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

    if (props.disabled) {
        color="#BDBDBD";
        accent="#757575";
    }

    return (
        <button 
        style={{...props.btnStyle, background: color, color: accent}} 
        className={style.Button}
        onClick={props.clicked}
        disabled={props.disabled}
        >{props.children}</button>
    );
}

export default button;