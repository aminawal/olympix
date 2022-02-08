import React, { useContext } from "react";

import DataContext from "../../context/DataContext";
import { CategorieBox } from "./CategorieBox";

import classes from './Categories.module.css';

const Categories = (props) => {

    const ctx = useContext(DataContext);

    const categories = ctx.sports.map(sport => (
        <CategorieBox 
            key={sport.id}
            link={sport.link}
            src={sport.img}
            alt={sport.alt}
            sport={sport.name}
        />
    ));

    return(
        <section className={classes.grid}>{categories}</section>
    );
};

export default Categories;