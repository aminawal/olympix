import React, { useState } from "react";
import { Prompt } from "react-router";

import CreateForm from "../../components/CreateForm/CreateForm";

import useFetch from "../../hooks/useFetch";

import classes from './Create.module.css';

const Create = (props) => {

    const [formIsFocused, setFormIsFocused] = useState(false);

    const { isLoading, error, sendRequest } = useFetch();

    const focusHandler = () => {
        setFormIsFocused(true);
    };

    const unFocusHandler = () => {
        setFormIsFocused(false);
    };

    const creatEventHandler = (eventData) => {

        console.log(eventData);

        const newEventData = {
            img: "fussball/fussballImage1.png",
            ...eventData,
            host: {
                id: 1,
                firstName: "Abdullah",
                lastName: "Minawal",
                image: "1.png"
            },
            subscribers: [
                {
                id: 1,
                firstName: "Abdullah",
                lastName: "Minawal",
                image: "1.png"
                }
            ]
        };

        const newEventCard = {
            category: eventData.category,
            img: "fussball/fussballImage1.png",
            title: eventData.title,
            city: eventData.city,
            date: eventData.date
        };

        sendRequest({
            url: `http://localhost:3500/${eventData.category}`
        },
            data => {
                const eventId = data.length > 0 ? +data[data.length-1].id + 1 : 1;
                sendRequest({
                    url:`http://localhost:3500/${eventData.category}`,
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: {id: eventId,...newEventData}
                },
                sendRequest({
                    url: `http://localhost:3500/members/1`
                },
                    data => {
                        const eId = data.length > 0 ? `${eventData.category}+${eventId}` : `${eventData.category}+1`;
                        sendRequest({
                            url:`http://localhost:3500/members/1`,
                            method: "PATCH",
                            headers: { "Content-Type": "application/json"},
                            body: {subscribedEvents: data.subscribedEvents.concat({id: eId, ...newEventCard})}
                        },
                            data => null
                    );
                        sendRequest({
                            url:`http://localhost:3500/members/1`,
                            method: "PATCH",
                            headers: { "Content-Type": "application/json"},
                            body: {createdEvents: data.createdEvents.concat({id: eId, ...newEventCard})}
                        },
                            data => null
                    );
                }),
                    data => null
                );
        });

    };


    return(
        <div className={classes.grid}>
            <Prompt when={formIsFocused} message={() => "Was los bro?"}/>
            <p>Create a new event</p>
            <CreateForm 
                onCreateEvent={creatEventHandler}
                onFocus={focusHandler}
                btnClick={unFocusHandler}
            />
        </div>
    );
};

export default Create;