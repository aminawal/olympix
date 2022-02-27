import React, { useState, useEffect } from "react";

import EventCard from '../EventCard'

import useFetch from "../../hooks/useFetch";

import classes from './CreatedEvents.module.css';

const CreatedEvents = (props) => {

    const [createdEvents, setCreatedEvents] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [noEvents, setNoEvents] = useState(false);
    
    const { isLoading, error, sendRequest } = useFetch();

    useEffect(() => {

        sendRequest({url: `http://localhost:3500/members/1`},
        data => {
            setCreatedEvents(data.createdEvents);
            setCurrentUser({id: data.id});
            data.createdEvents.length === 0 && setNoEvents(true);
        });
            
    }, [sendRequest]);

    const deleteHandler = (e, eventPath) => {
        e.preventDefault();
        sendRequest({
            url:`http://localhost:3500/${eventPath.category}/${eventPath.eventId}`,
        },
            (data) => {
                sendRequest({
                    url:`http://localhost:3500/${eventPath.category}/${eventPath.eventId}`,
                    method: "PATCH",
                    headers: { "Content-Type": "application/json"},
                    body: {subscribers: data.subscribers.filter(
                        subscriber => subscriber.id !== currentUser.id
                    )}
                },
                    data => null
                );
            }
        );
        sendRequest({
            url: `http://localhost:3500/members/1`
        },
            data => {
                sendRequest({
                    url:`http://localhost:3500/members/1`,
                    method: "PATCH",
                    headers: { "Content-Type": "application/json"},
                    body: {subscribedEvents: data.subscribedEvents.filter(
                        event => event.id !== `${eventPath.category}+${eventPath.eventId}`
                    )}
                },
                    data => {
                        setCreatedEvents(data.subscribedEvents);
                        data.subscribedEvents.length === 0 && setNoEvents(true);
                    }
            );
        });
    };

    let eventsList;
    let filteredEventsCount;

    if (createdEvents) {

        const filteredEvents = createdEvents;

        filteredEventsCount = filteredEvents.length;

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

        if(filteredEventsCount > 0) {
            eventsList = filteredEvents.map(event => eventCards(event));
        } else if(filteredEventsCount === 0) {
            eventsList = <p>No created event.</p>
        }
    };

    return(
        <div className={classes.grid}>
            {isLoading && <p>Events Loading...</p>}
            {error && <p>{error}</p>}
            {!noEvents && !isLoading && !error && 
                <section className={classes.filters}>
                    <div className={classes.eventsCounter}>
                        {filteredEventsCount === 1 ? 
                            <span><b>{filteredEventsCount}</b> created event</span> :
                        filteredEventsCount > 1 && 
                            <span><b>{filteredEventsCount}</b> created events</span> 
                        }
                    </div>
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