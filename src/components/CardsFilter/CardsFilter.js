import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './CardsFilter.module.css';

const CardsFilter = (props) => {
    return(
        <section>
            <input className={classes.input} type="text" placeholder="Filter cities" />
            <FontAwesomeIcon className={classes.searchIcon} icon={faSearch}/>
        </section>
    );
};

export default CardsFilter;