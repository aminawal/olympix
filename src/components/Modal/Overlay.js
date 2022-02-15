import React from "react";

import classes from './Overlay.module.css';

const Overlay = (props) => {

    return(
        <div className={classes.grid}>
            <header>
                <h1>{props.title}</h1>
                <hr />
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                <button onClick={props.onCloseModal}>Close</button>
            </footer>
        </div>
    );
};

export default Overlay;