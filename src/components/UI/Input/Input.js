import React from 'react';
import style from './Input.module.css';

const input = (props) => {

    
    let type, styleClass, tag;
    if (props.type !== "textarea" && props.type !== "select") {
        switch(props.type) {
            case "text":
                type = props.type;
                styleClass = [style.Text];
                break;
            case "date":
                type = props.type;
                styleClass = [style.Text];
                break;
            case "password":
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

    } else if (props.type === "textarea"){
        tag = <textarea 
        className={style.Textarea} 
        placeholder={props.placeholder} 
        style={props.addStyle}
        value={props.value}
        onChange={props.change}
        />
    } else if (props.type === "select") {
        const listOfOptions = Object.keys(props.option).map((key, i) => {
            return <option value={props.option[key]} key={key+i}>{props.option[key]}</option>
        })

        tag = (
            <div className={style.InputDiv}>
                <label>{props.label}</label>
                <select onChange={props.change}>
                    {listOfOptions}
                </select>
            </div>
        )
    }


    return (
        <>
            {tag}
        </>
    );
}

export default input;