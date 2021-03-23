import React from 'react';
import teaching from '../../../assets/teaching.svg';
import style from './LandingPage.module.css';

const landingPage = () => {
    return(
        <div className={style.LandingPage}>
            <div>
                <h1>Welcome to Classroom</h1>
                <p>Start teaching or learning</p>
            </div>
            <img src={teaching} alt="Teaching"/>
        </div>
    );
}

export default landingPage;