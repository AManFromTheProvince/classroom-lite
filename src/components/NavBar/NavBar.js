import React from 'react';
import style from './NavBar.module.css';
import {NavLink} from 'react-router-dom';

const navBar = (props) => {

    let listItems;
    let menuItems = ["Welcome", "Sign up", "Log in"];
    let subdomain = ""   //subdomain for authenticating
    
    if (props.isAuth) {
        menuItems = ["Dashboard", "Create a class", "My Profile", "Log out"];
        subdomain = "/u/" //default user subdomain
    }

    
    

    listItems = menuItems.map((option, index) => {

        let styleClass = [style.Link];
        if (option === "Log out") {
            styleClass.push(style.LogOut);
            
            return <NavLink 
            key={option + index} 
            to={`${subdomain}${option.toLowerCase().split(" ").join("-")}`} 
            className={styleClass.join(" ")} 
            activeClassName={style.activeLink}
            onClick={() => props.logout()}
            >{option}</NavLink>;
        }

        
        return <NavLink 
        key={option + index} 
        to={`${subdomain}${option.toLowerCase().split(" ").join("-")}`} 
        className={styleClass.join(" ")} 
        activeClassName={style.activeLink}
        >{option}</NavLink>;
    });

    let navStyle = [style.NavBar];
    if (!props.isAuth) {
        navStyle.push(style.notAuth);
    }

    return (
        <div>
            <nav className={navStyle.join(" ")}>
                {props.isAuth 
                    ? 
                    <span className="material-icons" 
                        onClick={props.sidebarHandler}>{props.show ? "close" : "menu"}</span>
                    :
                    <h2>Classroom</h2>
                }
                <ul className={style.LinkList}>
                    {listItems}
                </ul>
            </nav>
        </div>
    );
}

export default navBar;