import React from "react";

import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

import classes from './Grid.module.css';

const Grid = (props) => {
    return(
        <div className={classes.grid}>
            <Header />
            <main className={classes.main}>
                {props.children}
            </main>
            <Navigation />
        </div>
    );
};

export default Grid;