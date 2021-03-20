import React from 'react';
import style from './NavBar.module.css';
import {NavLink} from 'react-router-dom';

const navBar = (props) => {

    let listItems;

    listItems = ["Dashboard", "Create a class", "My Profile", "Log out"].map((option, index) => {

        let styleClass = [style.Link];
        if (option === "Log out") {
            styleClass.push(style.LogOut);
        } 

        return <NavLink 
        key={option + index} 
        to={`/t/${option.toLowerCase().split(" ").join("-")}`} 
        className={styleClass.join(" ")} 
        activeClassName={style.activeLink}>{option}</NavLink>;
    });


    return (
        <div>
            <nav className={style.NavBar}>
                <span className="material-icons" onClick={props.sidebarHandler}>{props.show ? "close" : "menu"}</span>
                <ul className={style.LinkList}>
                    {listItems}
                </ul>
            </nav>
        </div>
    );
}

export default navBar;