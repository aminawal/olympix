import React from "react";

import classes from './OrganizerCard.module.css';

const OrganizerCard = (props) => {

    return(
        <section className={classes.grid}>
            <img src={require(`../../assets/members/${props.img}`)} alt=""/>
            <div>
                <h5>Your Host:</h5>
                <span>{props.name}</span>
            </div>
        </section>
    );
};

export default OrganizerCard;