import React from "react";

import './CardsSelectFilter.module.css';

const CardsSelectFilter = (props) => {

    const changeHandler = (e) => {
        props.onChange(e.target.value);
    };

    return(
        <select name={props.name} defaultValue={props.defaultValue} onChange={changeHandler}>
            <option value="">{props.defaultOption}</option>
            {props.options.map(option => (
                <option 
                    key={option.value} 
                    value={option.value}
                >
                    {option.title}
                </option>
            ))}
        </select>
    );
};

export default CardsSelectFilter;