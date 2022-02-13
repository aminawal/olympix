import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import EventInfo from "../../components/EventInfo";
import EventSubscribers from "../../components/EventSubscribers/EventSubscribers";
import Button from "../../components/Button/Button";
import OrganizerCard from "../../components/OrganizerCard/OrganizerCard";
import useFetch from "../../hooks/useFetch";

import classes from './EventDetails.module.css';
import EventImage from "../../components/EventImage/EventImage";

const EventDetails = (props) => {

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

    const { isLoading, error, sendRequest } = useFetch();

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

    useEffect(() => { 
        sendRequest({url: `http://localhost:3500/${category}/${eventId}`},
        data => updateFunc(data));

        sendRequest({url: `http://localhost:3500/members/2`},
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
    }, [sendRequest, category, eventId]);


    const subscribeHandler = () => {
        sendRequest({
                url: `http://localhost:3500/${category}/${eventId}`,
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: {subscribers: subscribers.concat(currentSubscriber)}
            },  
                (data) => updateFunc(data)
        );
        sendRequest({
                url:`http://localhost:3500/members/2`,
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: {subscribedEvents: memberData.subscribedEvents.concat({id: +eventId, category: category})}
            },
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
        sendRequest({
                url:`http://localhost:3500/${category}/${eventId}`,
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: {subscribers: subscribers.filter(subscriber => subscriber.id !== currentSubscriber.id)}
            },
                (data) => updateFunc(data)
        );
        sendRequest({
                url:`http://localhost:3500/members/2`,
                method: "PATCH",
                headers: { "Content-Type": "application/json"},
                body: {subscribedEvents: memberData.subscribedEvents.filter(event => event.id !== +eventId && category)}
            },
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