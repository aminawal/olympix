import React from "react";

import { createPortal } from "react-dom";

import Backdrop from "./Backdrop";
import Overlay from "./Overlay";

import classes from './Modal.module.css';

const Modal = (props) => {

    return(
        <section>
            {createPortal(<Backdrop />, document.getElementById('modal-root'))}
            {createPortal(<div className={classes.overlayGrid}>
                <Overlay 
                    onCloseModal={props.onCloseModal} 
                    title={props.title}
                    children={props.children}
                />
            </div>, document.getElementById('modal-root'))}
        </section>
    );
};

export default Modal;