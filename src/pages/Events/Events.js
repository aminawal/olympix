import React from "react";

import { Route, Switch, Redirect } from "react-router";
import { NavLink } from "react-router-dom";

import SubscribedEvents from "../../components/SubscribedEvents/SubscribedEvents";
import CreatedEvents from "../../components/CreatedEvents/CreatedEvents";

import classes from './Events.module.css';

const Events = (props) => {
    return(
        <div className={classes.grid}>
            <nav className={classes.nav}>
                <NavLink to="/events/subscribed" activeClassName={classes.active}>Subscribed</NavLink>
                <span>|</span>
                <NavLink to="/events/created" activeClassName={classes.active}>Created</NavLink>
            </nav>
            <Switch>
                <Route path="/events" exact>
                    <Redirect to="/events/subscribed"/>
                </Route>
                <Route path="/events/subscribed">
                    <SubscribedEvents />
                </Route>
                <Route path="/events/created">
                    <CreatedEvents />
                </Route>
            </Switch>
        </div>
    );
};

export default Events;