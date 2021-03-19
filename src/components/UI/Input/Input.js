import React from 'react';
import style from './Input.module.css';

const input = (props) => {

    
    let type, styleClass, tag;
    if (props.type !== "textarea") {
        switch(props.type) {
            case "text":
                type = props.type;
                styleClass = [style.Text];
                break;
            default:
                type = "";
                styleClass=[];
        }
        
        styleClass.push(style.Input);
        tag = <input type={type} className={styleClass.join(" ")} placeholder={props.placeholder} style={props.addStyle}/>

    } else {
        tag = <textarea className={style.Textarea} placeholder={props.placeholder} style={props.addStyle}/>
    }


    return (
        <>
            {tag}
        </>
    );
}

export default input;