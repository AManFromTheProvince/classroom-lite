import React from 'react';
import style from './NavBar.module.css';

const navBar = () => {
    return (
        <div>
            <nav className={style.NavBar}>
                <ul className={style.LinkList}>
                    <li>Dashboard</li>
                    <li>My Profile</li>
                </ul>
            </nav>
        </div>
    );
}

export default navBar;