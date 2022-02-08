import React from "react";

import { Link } from "react-router-dom";

import classes from './CategorieBox.module.css';

export const CategorieBox = (props) => {
    return(
        <Link className={classes.link} to={`/${props.link}`} key={props.id}>
            <img className={classes.icon} src={props.src} alt={props.alt} />
            <h3 className={classes.sport}>{props.sport}</h3>
        </Link>
    );
};