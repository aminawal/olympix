import React, { useEffect, useReducer, useState } from "react";

import { useParams } from "react-router";

import Modal from "../../components/Modal/Modal";
import EventSubscribersList from "../../components/EventSubscribersList";
import EventInfo from "../../components/EventInfo";
import EventSubscribers from "../../components/EventSubscribers/EventSubscribers";
import Button from "../../components/Button/Button";
import OrganizerCard from "../../components/OrganizerCard/OrganizerCard";
import EventImage from "../../components/EventImage/EventImage";

import useFetch from "../../hooks/useFetch";

import classes from './EventDetails.module.css';

const defaultState = {
    eventData: null,
    subscribers: [],
    subscribersExcerpt: [],
    furtherAmount: null,
    leftPlacesAmount: null,
    organizerName: "",
    subscriberStop: false,
    memberData: null,
    currentSubscriber: null,
    isSubscriber: null
};

const EventDetails = (props) => {

    const [eventState, dispatchAction] = useReducer(eventReducer, defaultState);

    const [showSubscribers, setShowSubscribers] = useState(false);

    const {category, eventId} = useParams();

    const { isLoading, error, sendRequest } = useFetch();


    useEffect(() => { 
        sendRequest({url: `http://localhost:3500/${category}/${eventId}`},
        data => dispatchAction({type: "UPDATE_EVENT", data}));

        sendRequest({url: `http://localhost:3500/members/2`},
        data => dispatchAction({type: "UPDATE_MEMBER", data, category, eventId}));
            
    }, [sendRequest, category, eventId]);


    const subscribeHandler = () => {
        sendRequest({
                url: `http://localhost:3500/${category}/${eventId}`,
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: {subscribers: eventState.eventData.subscribers.concat(eventState.currentSubscriber)}
            },  
                data => dispatchAction({type: "UPDATE_EVENT", data})
        );
        sendRequest({
                url:`http://localhost:3500/members/2`,
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: {subscribedEvents: eventState.memberData.subscribedEvents.concat(
                    {
                        id: `${category}+${+eventId}`, 
                        category: category, 
                        img: eventState.eventData.img,
                        title: eventState.eventData.title,
                        city: eventState.eventData.city,
                        date: eventState.eventData.date,
                    }
                )}
            },
                
                data => dispatchAction({type: "ADD_SUBSCRIBER", data, category, eventId})
            
        );
    };

    const unsubscribeHandler = () => {
        sendRequest({
                url:`http://localhost:3500/${category}/${eventId}`,
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: {subscribers: eventState.eventData.subscribers.filter(
                    subscriber => subscriber.id !== eventState.currentSubscriber.id
                )}
            },
                (data) => dispatchAction({type: "UPDATE_EVENT", data})
        );
        sendRequest({
                url:`http://localhost:3500/members/2`,
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: {subscribedEvents: eventState.memberData.subscribedEvents.filter(event => event.id !== `${category}+${+eventId}`)}
            },

                data => dispatchAction({type: "REMOVE_SUBSCRIBER", data, category, eventId})
        );
    };

    const showSubscribersHandler = () => {
        setShowSubscribers(true);
    }

    const closeModalHandler = () => {
        setShowSubscribers(false);
    };


    return(
        <>
            {isLoading && <p>Loading event...</p>}
            {error && <p>{error}</p>}
            {eventState.eventData && 
            <div className={classes.grid}>
                {showSubscribers &&
                    <Modal 
                        title="All Subscribers"
                        onCloseModal={closeModalHandler}
                    >
                        <EventSubscribersList subscribers={eventState.eventData.subscribers}/>
                    </Modal>
                }
                <EventImage image={eventState.eventData.img}/>
                <div className={classes.content}>
                <EventInfo 
                    title={eventState.eventData.title}
                    address={eventState.eventData.address}
                    zip={eventState.eventData.zip}
                    city={eventState.eventData.city}
                    date={eventState.eventData.date}
                    time="18pm"
                    price={eventState.eventData.price}
                />
                <EventSubscribers 
                    subscribers={eventState.subscribersExcerpt}
                    furtherAmount={eventState.furtherAmount}
                    leftPlaces={eventState.leftPlacesAmount}
                    onShowSubscribers={showSubscribersHandler}
                />
                {!eventState.isSubscriber && !eventState.subscriberStop && 
                <Button 
                    onClick={subscribeHandler}
                    >Subscribe
                </Button>}
                {eventState.isSubscriber &&
                <Button 
                    className={classes.unsubscribeBtn}
                    onClick={unsubscribeHandler}
                    >Unsubscribe
                </Button>}
                {!eventState.isSubscriber && eventState.subscriberStop && 
                <Button 
                    className={classes.disabledBtn}
                    disabled={true}
                    >Event is full
                </Button>}
                <div className={classes.description}>
                    <h4>Description</h4>
                    <p className={classes.description}>{eventState.eventData.text}</p>
                </div>
                <OrganizerCard 
                    img={eventState.eventData.host.image}
                    name={eventState.organizerName}
                />
                </div>
            </div>}
        </>
    );
};

function eventReducer(state, action) {
    switch (action.type) {
        case "UPDATE_EVENT": 

        let eventData = action.data;

        let subscribersExcerpt;
        if(action.data.subscribers.length > 0) {
            const shortenData = action.data.subscribers.slice(-5);
            subscribersExcerpt = shortenData.map(subscriber => (
                <img key={subscriber.id} 
                     className={classes.subscriberImage} 
                     src={require(`../../assets/members/${subscriber.image}`)} 
                     alt=""
            />)
        )} else {
            subscribersExcerpt = [];
        };

        let furtherAmount;
        if(action.data.subscribers.length > 5) {
            furtherAmount = `+${action.data.subscribers.length - 5}`;
        } else {
            furtherAmount = null;
        };

        let leftPlacesAmount;
        if(typeof(action.data.limit) === "number"){
            leftPlacesAmount = action.data.limit - action.data.subscribers.length;
        } else {
            leftPlacesAmount = null;
        }

        let subscriberStop;
        if(typeof(action.data.limit) === "string") {
            subscriberStop = false;
        } else if (action.data.subscribers.length < action.data.limit){
            subscriberStop = false;
        } else {
            subscriberStop = true;
        };

        let organizerName = `${action.data.host.firstName} ${action.data.host.lastName}`;

            return {
                ...state,
                eventData,
                subscribersExcerpt,
                furtherAmount,
                leftPlacesAmount,
                organizerName,
                subscriberStop,
            };
            
        case "UPDATE_MEMBER":

            return {
                ...state,
                currentSubscriber: {
                    id: action.data.id,
                    firstName: action.data.firstName,
                    lastName: action.data.lastName,
                    image: action.data.img
                },
                memberData: action.data,
                isSubscriber: (
                    action.data.subscribedEvents.some(event => 
                        event.id === `${action.category}+${action.eventId}`
                    ) ? true : false
                )
            };

        case "ADD_SUBSCRIBER":

            return {
                ...state,
                memberData: action.data,
                isSubscriber: (
                    action.data.subscribedEvents.some(event => 
                        event.id === `${action.category}+${action.eventId}`
                    ) ? true : false
                )
            };
        
        case "REMOVE_SUBSCRIBER":

            return {
                ...state,
                memberData: action.data,
                isSubscriber: (
                    action.data.subscribedEvents.some(event => 
                        event.id === `${action.category}+${action.eventId}`
                    ) ? true : false
                )
            };

        default:
            return defaultState;
    }
};

export default EventDetails;