import React from 'react';
import illustrate from '../../../assets/working.svg';
import style from './Illustration.module.css';

const illustration = () => {
    return (
        <div className={style.IllustrationDiv}>
            <img src={illustrate} alt="Studying" className={style.Illustration}/>
            <p>Create a class or click any existing class</p>
        </div>
    )
}

export default illustration;