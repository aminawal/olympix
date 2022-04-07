import React, { useRef, useImperativeHandle } from "react";

import './CardsSelectFilter.module.css';

const CardsSelectFilter = React.forwardRef((props, ref) => {

    const defaultOptionRef = useRef();

    const showDefaultOption = () => {
        defaultOptionRef.current.selectedIndex = 0;
    };

    useImperativeHandle(ref, () => {
        return {
            defaultOption: showDefaultOption
        };
    });

    const changeHandler = (e) => {
        props.onChange(e.target.value);
    };

    return(
        <select 
            className={props.className}
            name={props.name} 
            defaultValue={props.defaultValue} 
            onChange={changeHandler}
            onBlur={props.onBlur}
            ref={defaultOptionRef}
        >
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
});

export default CardsSelectFilter;