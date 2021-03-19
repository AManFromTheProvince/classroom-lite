import React from 'react';
import style from './Spinner.module.css';

const spinner = () => {
    return (
        <div className={style.Spinner}>
            <div className={style.InsideSpinner}/>
        </div>
    );
}

export default spinner;