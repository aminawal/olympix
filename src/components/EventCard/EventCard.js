import React from "react";

import { Link } from "react-router-dom";

import classes from './EventCard.module.css';

const EventCard = (props) => {

    const clickHandler = (event) => {
        props.onClick(event, {category: props.category, eventId: props.id})
    };

    return(
        <Link to={`../sports/${props.category}/${props.id}`} className={classes.grid}>
            <div>
                <img src={require(`../../assets/images/${props.image}`)} alt=""/>
            </div>
            <div className={classes.content}>
                <h3>{props.title}</h3>
                <div>
                    <div>
                        <span>{props.city}</span>
                        <span>{props.date}</span>
                    </div>
                    {props.cardBtn && 
                        <button style={{backgroundColor: props.btnStyle}} onClick={clickHandler}>
                            {props.btn}
                        </button>
                    }
                </div>
            </div>
        </Link>
    );
};

export default EventCard;