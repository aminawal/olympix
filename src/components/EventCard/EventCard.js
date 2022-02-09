import React from "react";

import { Link, useRouteMatch } from "react-router-dom";

import classes from './EventCard.module.css';

const EventCard = (props) => {

    const match = useRouteMatch();

    return(
        <Link to={`${match.url}/${props.id}`} className={classes.card}>
            <div>
                <img className={classes.image} src={require(`../../assets/images/${props.image}`)} alt=""/>
            </div>
            <div className={classes.content}>
                <h3 className={classes.title}>{props.title}</h3>
                <p className={classes.city}>{props.city}</p>
            </div>
        </Link>
    );
};

export default EventCard;