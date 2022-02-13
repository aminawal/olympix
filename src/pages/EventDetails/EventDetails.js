import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

import EventInfo from "../../components/EventInfo";
import EventSubscribers from "../../components/EventSubscribers/EventSubscribers";
import Button from "../../components/Button/Button";
import OrganizerCard from "../../components/OrganizerCard/OrganizerCard";

import classes from './EventDetails.module.css';
import EventImage from "../../components/EventImage/EventImage";

const EventDetails = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [eventData, setEventData] = useState(null);
    const [memberData, setMemberData] = useState(null);
    const [isSubscriber, setIsSubscriber] = useState();
    const [currentSubscriber, setCurrentSubscriber] = useState();
    const [subscribersExcerpt, setSubscribersExcerpt] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [furtherAmount, setFurtherAmount] = useState();
    const [leftPlacesAmount, setleftPlacesAmount] = useState();
    const [organizerName, setOrganizerName] = useState("");
    const [subscriberStop, setSubscriberStop] = useState(false);

    const {category, eventId} = useParams();

    const updateFunc = (data) => {
        setEventData(data);
        if(data.subscribers.length > 0) {
        const shortenData = data.subscribers.slice(-5);
        setSubscribersExcerpt(shortenData.map(subscriber => (
            <img key={subscriber.id} className={classes.subscriberImage} src={require(`../../assets/members/${subscriber.image}`)} alt=""/>
        )))} else {
            setSubscribersExcerpt([])
        }
        if(data.subscribers.length > 5) {
            setFurtherAmount(`+${data.subscribers.length - 5}`);
        } else {
            setFurtherAmount(null)
        }
        if(typeof(data.limit) === "number"){
            setleftPlacesAmount(data.limit - data.subscribers.length);
        };
        setOrganizerName(`${data.host.firstName} ${data.host.lastName}`);
        setSubscribers(data.subscribers);
        if(typeof(data.limit) === "string") {
            setSubscriberStop(false);
        } else if (data.subscribers.length < data.limit){
            setSubscriberStop(false);
        } else {
            setSubscriberStop(true);
        };
    };

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
        data => updateFunc(data));

        fetchData(`http://localhost:3500/members/2`,
        "Member not found",
        (data) => {
            setMemberData(data);
            setCurrentSubscriber({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                image: data.img
            });
            data.subscribedEvents.some(event => 
                event.category === category &&
                event.id === +eventId
            ) ? setIsSubscriber(true) : setIsSubscriber(false);
        });
    }, [fetchData, category, eventId]);

    const patchData = useCallback (async(url, updateData, dataHandler) => {

        setIsLoading(true);
        setError(null);

        try{

            const response = await fetch(url, {
                method: "PATCH",
                body: JSON.stringify(updateData),
                headers:{
                    "Content-Type": "application/json"
                } 
            });
            if(!response.ok) {
                throw Error("Something went wrong");
            };

            const data = await response.json();
            dataHandler(data);

        } catch(error) {
            setError(error.message);

        } finally {
            setIsLoading(false);

        }
    }, []);

    const subscribeHandler = () => {
        patchData(
            `http://localhost:3500/${category}/${eventId}`,
            {subscribers: subscribers.concat(currentSubscriber)},
            (data) => updateFunc(data)
        );
        patchData(
            `http://localhost:3500/members/2`,
            {subscribedEvents: memberData.subscribedEvents.concat({id: +eventId, category: category})},
            (data) => {
                setMemberData(data);
                data.subscribedEvents.some(event => 
                event.category === category &&
                event.id === +eventId
                ) ? setIsSubscriber(true) : setIsSubscriber(false);
            }
        );
    };

    const unsubscribeHandler = () => {
        patchData(`http://localhost:3500/${category}/${eventId}`,
            {subscribers: subscribers.filter(subscriber => subscriber.id !== currentSubscriber.id)},
            (data) => updateFunc(data)
        );
        patchData(
            `http://localhost:3500/members/2`,
            {subscribedEvents: memberData.subscribedEvents.filter(event => event.id !== +eventId && category)},
            (data) => {
                setMemberData(data);
                data.subscribedEvents.some(event => 
                event.category === category && event.id === +eventId
                ) ? setIsSubscriber(true) : setIsSubscriber(false);
            }
        );
    };

    return(
        <>
            {isLoading && <p>Is Loading...</p>}
            {error && <p>{error}</p>}
            {eventData && 
            <div className={classes.grid}>
                <EventImage image={eventData.img}/>
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
                    subscribers={subscribersExcerpt}
                    furtherAmount={furtherAmount}
                    leftPlaces={leftPlacesAmount}
                />
                {!isSubscriber && !subscriberStop && 
                <Button 
                    onClick={subscribeHandler}
                    >Subscribe
                </Button>}
                {isSubscriber &&
                <Button 
                    className={classes.unsubscribeBtn}
                    onClick={unsubscribeHandler}
                    >Unsubscribe
                </Button>}
                {!isSubscriber && subscriberStop && 
                <Button 
                    className={classes.disabledBtn}
                    disabled={true}
                    >Event is full
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