import React from 'react';
import style from './NavBar.module.css';
import {NavLink} from 'react-router-dom';

const navBar = () => {

    let listItems;

    listItems = ["Dashboard", "Create a class", "My Profile", "Log out"].map((option, index) => {

        let styleClass = [style.Link];
        if (option === "Log out") {
            styleClass.push(style.LogOut);
        } 

        return <NavLink 
        key={option + index} 
        to={`/t/${option.toLowerCase().split(" ").join("_")}`} 
        className={styleClass.join(" ")} 
        activeClassName={style.activeLink}>{option}</NavLink>;
    });


    return (
        <div>
            <nav className={style.NavBar}>
                <ul className={style.LinkList}>
                    {listItems}
                </ul>
            </nav>
        </div>
    );
}

export default navBar;