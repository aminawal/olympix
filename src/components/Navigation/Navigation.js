import React, { useReducer } from "react";

import { NavigationLink } from "./NavigationLink";

import { faCompass as fasCompass, faCalendar as fasCalendar, faPlusSquare as fasPlusSquare, faUser as fasUser } 
from '@fortawesome/free-solid-svg-icons';
import { faCompass as farCompass, faCalendar as farCalendar, faPlusSquare as farPlusSquare, faUser as farUser } 
from '@fortawesome/free-regular-svg-icons';
import classes from './Navigation.module.css';

const defaultState = {
    startIsActive: true,
    eventsIsActive: false,
    createIsActive: false,
    profileIsActive: false
};

const isActiveReducer = (state, action) => {
    switch (action.type) {
        case "START": 
            return {
                startIsActive: true,
                eventsIsActive: false,
                createIsActive: false,
                profileIsActive: false
            };
        case "EVENTS":
            return {
                startIsActive: false,
                eventsIsActive: true,
                createIsActive: false,
                profileIsActive: false  
            };
        case "CREATE":
            return {
                startIsActive: false,
                eventsIsActive: false,
                createIsActive: true,
                profileIsActive: false  
            };
        case "PROFILE":
            return {
                startIsActive: false,
                eventsIsActive: false,
                createIsActive: false,
                profileIsActive: true  
            };
        default:
            return defaultState;
    }
};

const Navigation = (props) => {

    const [isActiveState, dispatchIsActive] = useReducer(isActiveReducer, defaultState);

    return(
        <nav className={classes.nav}>
           <NavigationLink
            onClick = {() => dispatchIsActive({type:"START"})} 
            link="/"
            icon={isActiveState.startIsActive ? fasCompass : farCompass}
            text="Start"
           />
           <NavigationLink
            onClick = {() => dispatchIsActive({type:"EVENTS"})} 
            link="/events"
            icon={isActiveState.eventsIsActive ? fasCalendar : farCalendar}
            text="Events"
           />
           <NavigationLink
            onClick = {() => dispatchIsActive({type:"CREATE"})} 
            link="/create"
            icon={isActiveState.createIsActive ? fasPlusSquare : farPlusSquare}
            text="Create"
           />
           <NavigationLink
            onClick = {() => dispatchIsActive({type:"PROFILE"})} 
            link="/profile"
            icon={isActiveState.profileIsActive ? fasUser : farUser}
            text="Profile"
           />
        </nav>
    );
};

export default Navigation;