import React from "react";

import { Link } from "react-router-dom";

import Logo from '../../assets/logo/Logo.png';
import classes from './Header.module.css';

const Header = (props) => {
    return(
        <header className={classes.header}>
            <Link to="/"><img src={Logo} alt="Olympix Logo" className={classes.logo}/></Link>
            <h1 className={classes.headline}>Headline</h1>
        </header>
    );
};

export default Header;