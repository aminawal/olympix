import React from "react";

import classes from './EventSubscribersList.module.css';

const EventSubscribersList = (props) => {

    return(
        <section className={classes.grid}>
            {props.subscribers.length > 0 ? props.subscribers.map(subscriber => (
                <div key={subscriber.id}>
                    <img src={require(`../../assets/members/${subscriber.image}`)} alt="" />
                    <span>{`${subscriber.firstName} ${subscriber.lastName}`}</span>
                </div>
            )) : <span>No subcribers yet.</span>}
        </section>
    );
};

export default EventSubscribersList;