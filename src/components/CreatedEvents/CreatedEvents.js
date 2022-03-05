import React, { useState, useEffect } from "react";

import EventCard from '../EventCard'
import CreateNewEventButton from "../CreateNewEventButton";

import useFetch from "../../hooks/useFetch";

import classes from './CreatedEvents.module.css';

const CreatedEvents = (props) => {

    const [createdEvents, setCreatedEvents] = useState(null);
    const [noEvents, setNoEvents] = useState(false);
    
    const { isLoading, error, sendRequest } = useFetch();

    useEffect(() => {

        sendRequest({url: `http://localhost:3500/members/1`},
        data => {
            setCreatedEvents(data.createdEvents);
            data.createdEvents.length === 0 && setNoEvents(true);
        });
            
    }, [sendRequest]);

    const deleteHandler = (e, eventPath) => {
        e.preventDefault();
        sendRequest({
            url:`http://localhost:3500/${eventPath.category}/${eventPath.eventId}`,
            method: "DELETE"
        },
            (data) => null
        );
        sendRequest({
            url: `http://localhost:3500/members/1`
        },
            data => {
                sendRequest({
                    url:`http://localhost:3500/members/1`,
                    method: "PATCH",
                    headers: { "Content-Type": "application/json"},
                    body: {createdEvents: data.createdEvents.filter(
                        event => event.id !== `${eventPath.category}+${eventPath.eventId}`
                    )}
                },
                    data => {
                        setCreatedEvents(data.createdEvents);
                        data.createdEvents.length === 0 && setNoEvents(true);
                    }
            );
        });
        sendRequest({
            url: `http://localhost:3500/members`
        },
            data => {
                for(let i = 0; i < data.length; i++){
                    if(data[i].subscribedEvents.some(event => event.id === `${eventPath.category}+${eventPath.eventId}`)){
                        sendRequest({
                            url:`http://localhost:3500/members/${data[i].id}`,
                            method: "PATCH",
                            headers: { "Content-Type": "application/json"},
                            body: {subscribedEvents: data[i].subscribedEvents.filter(
                                event => event.id !== `${eventPath.category}+${eventPath.eventId}`
                            )}
                        },
                            data => null
                        );
                    }
                };
            }
        );

    };

    let eventsList;

    if (createdEvents) {

        const eventCards = event => {

            const eventId = +(event.id.split("+")[1]);
            
            return (
                <EventCard 
                    key={event.id}
                    id={eventId}
                    category={event.category}
                    image={event.img}
                    title={event.title}
                    city={event.city}
                    date={event.date}
                    cardBtn={true}
                    onClick={deleteHandler}
                    btn="Delete"
                    btnStyle="red"
                 />)
        };

        if(createdEvents.length > 0) {
            eventsList = createdEvents.map(event => eventCards(event));
        } else if(createdEvents === 0) {
            eventsList = <p>No created event.</p>
        }
    };

    return(
        <div className={classes.grid}>
            {isLoading && <p>Events Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && 
                <section className={classes.filters}>
                    <CreateNewEventButton link="/create"/>
                </section>
            }
            <section className={classes.eventsList}>
                {!noEvents && eventsList}
                {noEvents && <p>No created events yet.</p>}
            </section>
        </div>
    );
};

export default CreatedEvents;