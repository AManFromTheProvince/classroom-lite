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
            case "date":
                type = props.type;
                styleClass = [style.Text];
                break;
            default:
                type = "";
                styleClass=[];
        }
        
        styleClass.push(style.Input);
        tag = (
        <div className={style.InputDiv}>
            <label>{props.label}</label>
            <input 
            type={type} 
            className={styleClass.join(" ")} 
            placeholder={props.placeholder} 
            style={props.addStyle}
            value={props.value}
            onChange={props.change}
            />
        </div>
        );

    } else {
        tag = <textarea 
        className={style.Textarea} 
        placeholder={props.placeholder} 
        style={props.addStyle}
        value={props.value}
        onChange={props.change}
        />
    }


    return (
        <>
            {tag}
        </>
    );
}

export default input;