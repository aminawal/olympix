import React from "react";

import classes from './Backdrop.module.css';

const Backdrop = (props) => {

    return(
        <div onClick={props.onCloseModal} className={classes.backdrop}/>
    );
};

export default Backdrop;