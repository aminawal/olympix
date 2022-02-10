import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './CardsFilter.module.css';

const CardsFilter = (props) => {

    const changeHandler = e => {
        props.onFilter(e.target.value);
    };

    return(
        <section className={classes.inputWrapper}>
        <input className={classes.input} type="text" placeholder="Filter cities" onChange={changeHandler}/>
        <FontAwesomeIcon className={classes.searchIcon} icon={faSearch}/>
        </section>
    );
};

export default CardsFilter;