import React from "react";

import Logo from '../../assets/Logo/Logo.png';

import classes from './Header.module.css';

const Header = (props) => {
    return(
        <header className={classes.header}>
            <a href="/"><img src={Logo} alt="Olympix Logo" className={classes.logo}/></a>
            <h1 className={classes.headline}>Headline</h1>
        </header>
    );
};

export default Header;