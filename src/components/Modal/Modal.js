import React from "react";

import Backdrop from "./Backdrop";
import Overlay from "./Overlay";

import classes from './Modal.module.css';

const Modal = (props) => {

    return(
        <section>
            <Backdrop />
            <div className={classes.overlayGrid}>
                <Overlay 
                    onCloseModal={props.onCloseModal} 
                    title={props.title}
                    children={props.children}
                />
            </div>
        </section>
    );
};

export default Modal;