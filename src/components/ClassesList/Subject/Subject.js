import React from 'react';
import style from './Subject.module.css';

const subject = (props) => {

    let styleNames = [style.Subject];

    if (props.active) {
        styleNames.push(style.active);
    }


    return (
        <div className={styleNames.join(" ")} onClick={props.currentClassHandler}>
            <h2>{props.name}</h2>
            <p className={style.Schedule}>{props.schedule}</p>
            <p className={style.Teacher}>{props.teacher}</p>
        </div>
    );  

}

export default subject;