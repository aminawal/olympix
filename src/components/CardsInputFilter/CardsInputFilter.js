import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './CardsInputFilter.module.css';

const CardsInputFilter = (props) => {

    const changeHandler = e => {
        props.onFilter(e.target.value);
    };

    return(
        <section className={classes.inputWrapper}>
        <input className={classes.input} type="text" placeholder="Filter cities" onChange={changeHandler}/>
        <FontAwesomeIcon className={classes.searchIcon} icon={faSearch}/>
        <p className={classes.amount}>
            {props.length > 0 ? <span>{props.length} </span> : "No "}
            {`${props.length > 1 ? "events" : "event"} found`}
        </p>
        </section>
    );
};

export default CardsInputFilter;