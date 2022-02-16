import React, { useState, useEffect } from "react";

import EventCard from '../../components/EventCard'

import useFetch from "../../hooks/useFetch";

import classes from './Events.module.css';

const Events = (props) => {

    const [subscribedEvents, setSubscribedEvents] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const { isLoading, error, sendRequest } = useFetch();

    useEffect(() => {

        sendRequest({url: `http://localhost:3500/members/2`},
        data => {
            setSubscribedEvents(data.subscribedEvents);
            setCurrentUser({id: data.id});
        });
            
    }, [sendRequest]);

    const unsubscribeHandler = (e, eventPath) => {
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
                    data => console.log(data)
                );
            }
        );
        sendRequest({
            url: `http://localhost:3500/members/2`
        },
            data => {
                sendRequest({
                    url:`http://localhost:3500/members/2`,
                    method: "PATCH",
                    headers: { "Content-Type": "application/json"},
                    body: {subscribedEvents: data.subscribedEvents.filter(
                        event => event.id !== `${eventPath.category}+${eventPath.eventId}`
                    )}
                },
                    data => setSubscribedEvents(data.subscribedEvents)
            );
        });
    };

    let eventsList;

    if (subscribedEvents) {
        if(subscribedEvents.length > 0) {
            eventsList = subscribedEvents.map(event => {

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
                        onUnsubscribe={unsubscribeHandler}
                     />)
            });
        } else {
            eventsList = <p>No subscribed events yet.</p>
        }
    };

    return(
        <section className={classes.grid}>
            {isLoading && <p>Events Loading...</p>}
            {error && <p>{error}</p>}
            {eventsList}
        </section>
    );
};

export default Events;