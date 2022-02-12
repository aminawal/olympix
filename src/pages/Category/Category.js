import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import CardsFilter from "../../components/CardsFilter/CardsFilter";
import EventCard from "../../components/EventCard/EventCard";

import classes from './Category.module.css';

const Category = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [error, setError] = useState(null);

    const { category } = useParams();

    useEffect(() => {

        const fetchEvents = async(sport) => {

            setIsLoading(true);
            setError(null);

            try{
                const response = await fetch(`http://localhost:3500/${category}`);
                if(!response.ok) {
                    throw Error(`No ${category} events found.`);
                }
                const data = await response.json();

                let eventsData = [];

                if (data.length > 0) {
                    for(let key in data){
                        const eventData = {
                            id: data[key].id,
                            img: data[key].img,
                            title: data[key].title,
                            city: data[key].city
                        };
                        eventsData.push(eventData);
                    };
                } else {
                    throw Error(`No ${category} events found.`);
                }

                setEvents(eventsData);
                setFilteredEvents(eventsData);

            }catch(error){
                setError(error.message);
            }finally{
                setIsLoading(false);
            }
    
        };

        fetchEvents(category);

    }, [category]);

    const eventsList = filteredEvents.map(event => (
        <EventCard 
            key={event.id}
            id={event.id}
            image={event.img}
            title={event.title}
            city={event.city}
        />
    ))

    const filterHandler = (input) => {
        const filteredCities = events.filter(event => {
            const value = input.trim().toLowerCase();
            return value === event.city.toLowerCase().slice(0, value.length);
        });
        setFilteredEvents(filteredCities);
    };

    return(
        <div className={classes.grid}>
            {events.length > 0 && <CardsFilter onFilter={filterHandler} length={filteredEvents.length}/>}
            <section>
                {isLoading && <p>Loading events...</p>}
                {error && error}
            </section>
            <section className={classes.cards}>
                {eventsList}
            </section>
        </div>
    );
};

export default Category;