import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router";

import EventInfo from "../../components/EventInfo";
import EventSubscribers from "../../components/EventSubscribers/EventSubscribers";
import Button from "../../components/Button/Button";
import OrganizerCard from "../../components/OrganizerCard/OrganizerCard";

import classes from './EventDetails.module.css';

const EventDetails = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [eventData, setEventData] = useState(null);
    const [error, setError] = useState(null);
    const [memberData, setMemberData] = useState(null);
    const [isSubscriber, setIsSubscriber] = useState(false);

    const {category, eventId} = useParams();

    const fetchData = useCallback (async(url, errorMessage, dataHandler) => {

        setIsLoading(true);
        setError(null);

        try{

            const response = await fetch(url);
            if(!response.ok) {
                throw Error(errorMessage);
            };

            const data = await response.json();

            dataHandler(data);

        } catch(error) {
            setError(error.message);

        } finally {

            setIsLoading(false);

        }
    }, []);

    useEffect(() => {

        fetchData(`http://localhost:3500/${category}/${eventId}`,
        "Event not found",
        (data) => setEventData(data));

        fetchData(`http://localhost:3500/members/1`,
        "Member not found",
        (data) => {
            setMemberData(data);
            data.subscribedEvents.some(event => 
                event.category === category &&
                event.id === +eventId
            ) ? setIsSubscriber(true) : setIsSubscriber(false);
        });

    }, [fetchData, category, eventId]);

    let subscribers;
    let furtherAmount;
    let leftPlacesAmount;
    let organizerName;


    if(eventData && memberData) {
        const shortenData = eventData.subscribers.slice(-5);
        subscribers = shortenData.map(subscriber => (
            <img key={subscriber.id} className={classes.subscriberImage} src={require(`../../assets/members/${subscriber.image}`)} alt=""/>
        ));
        if(eventData.subscribers.length > 5) {
            furtherAmount = `+${eventData.subscribers.length - 5}`;
        };
        if(typeof(eventData.limit) === "number"){
            leftPlacesAmount = eventData.limit - eventData.subscribers.length;
        };
        organizerName = `${eventData.host.firstName} ${eventData.host.lastName}`;
    };

    const subscribeHandler = () => {
        setIsSubscriber(true);
    };

    const unsubscribeHandler = () => {
        setIsSubscriber(false);
    };

    return(
        <>
            {isLoading && <p>Is Loading...</p>}
            {error && <p>{error}</p>}
            {eventData && 
            <div className={classes.grid}>
                <img className={classes.image} src={require(`../../assets/images/${eventData.img}`)} alt=""/>
                <div className={classes.content}>
                <EventInfo 
                    title={eventData.title}
                    address={eventData.address}
                    zip={eventData.zip}
                    city={eventData.city}
                    date={eventData.date}
                    time="18pm"
                    price={eventData.price}
                />
                <EventSubscribers 
                    subscribers={subscribers}
                    furtherAmount={furtherAmount}
                    leftPlaces={leftPlacesAmount}
                />
                {!isSubscriber && 
                <Button 
                    onClick={subscribeHandler}
                    >Subscribe
                </Button>}
                {isSubscriber && 
                <Button 
                    onClick={unsubscribeHandler}
                    >Unsubscribe
                </Button>}
                <div className={classes.description}>
                    <h4>Description</h4>
                    <p className={classes.description}>{eventData.text}</p>
                </div>
                <OrganizerCard 
                    img={eventData.host.image}
                    name={organizerName}
                />
                </div>
            </div>}
        </>
    );
};

export default EventDetails;