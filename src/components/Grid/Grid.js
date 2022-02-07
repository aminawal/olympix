import React from "react";

import Header from "../Header/Header";

import classes from './Grid.module.css';

const Grid = (props) => {
    return(
        <div className={classes.grid}>
            <Header />
            {props.children}
        </div>
    );
};

export default Grid;