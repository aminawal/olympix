import React, { useState, useContext, useRef } from "react";

import DataContext from "../../context/DataContext";
import useInput from "../../hooks/useInput";

import Button from "../../components/Button/Button";
import CardsSelectFilter from "../../components/CardsSelectFilter";

import classes from './Create.module.css';

const Create = (props) => {

    const [sport, setSport] = useState("");

    const ctx =  useContext(DataContext);
    
    const categoryRef = useRef();
    const titleRef = useRef();
    const addressRef = useRef();
    const zipRef = useRef();
    const cityRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const feeRef = useRef();
    const maxRef = useRef();
    const descriptionRef = useRef();

    const sportCategories = ctx.sports.map(sport => {
        return {
            value: sport.name,
            title: sport.name
        }
    });

    const changeCategoryHandler = (categoryValue) => {
        setSport(categoryValue);
    };
    
    const categoryIsValid = sport !== "" && sport !== "Select category";
    const validateTitle = (value) => value.trim() !== "";
    const validateAddress = (value) => value.trim() !== "";
    const validateZip = (value) => value.trim() !== "";
    const validateCity = (value) => value.trim() !== "";
    const validateDate = (value) => value.trim() !== "";
    const validateTime = (value) => value.trim() !== "";
    const validateFee = (value) => value.trim() !== "";
    const validateMax = (value) => value.trim() !== "";
    const validateDescription = (value) => value.trim() !== "";

    const {
        enteredValue: titleValue,
        valueIsValid: titleIsValid,
        inputHasError: titleHasError,
        changeValueHandler: changeTitleHandler,
        touchedHandler: titleTouchedHandler,
        resetInputHandler: resetTitleHandler
    } = useInput(validateTitle);

    const {
        enteredValue: addressValue,
        valueIsValid: addressIsValid,
        inputHasError: addressHasError,
        changeValueHandler: changeAddressHandler,
        touchedHandler: addressTouchedHandler,
        resetInputHandler: resetAddressHandler
    } = useInput(validateAddress);

    const {
        enteredValue: zipValue,
        valueIsValid: zipIsValid,
        inputHasError: zipHasError,
        changeValueHandler: changeZipHandler,
        touchedHandler: zipTouchedHandler,
        resetInputHandler: resetZipHandler
    } = useInput(validateZip);

    const {
        enteredValue: cityValue,
        valueIsValid: cityIsValid,
        inputHasError: cityHasError,
        changeValueHandler: changeCityHandler,
        touchedHandler: cityTouchedHandler,
        resetInputHandler: resetCityHandler
    } = useInput(validateCity);

    const {
        enteredValue: dateValue,
        valueIsValid: dateIsValid,
        inputHasError: dateHasError,
        changeValueHandler: changeDateHandler,
        touchedHandler: dateTouchedHandler,
        resetInputHandler: resetDateHandler
    } = useInput(validateDate);

    const {
        enteredValue: timeValue,
        valueIsValid: timeIsValid,
        inputHasError: timeHasError,
        changeValueHandler: changeTimeHandler,
        touchedHandler: timeTouchedHandler,
        resetInputHandler: resetTimeHandler
    } = useInput(validateTime);

    const {
        enteredValue: feeValue,
        valueIsValid: feeIsValid,
        inputHasError: feeHasError,
        changeValueHandler: changeFeeHandler,
        touchedHandler: feeTouchedHandler,
        resetInputHandler: resetFeeHandler
    } = useInput(validateFee);

    const {
        enteredValue: maxValue,
        valueIsValid: maxIsValid,
        inputHasError: maxHasError,
        changeValueHandler: changeMaxHandler,
        touchedHandler: maxTouchedHandler,
        resetInputHandler: resetMaxHandler
    } = useInput(validateMax);

    const {
        enteredValue: descriptionValue,
        valueIsValid: descriptionIsValid,
        inputHasError: descriptionHasError,
        changeValueHandler: changeDescriptionHandler,
        touchedHandler: descriptionTouchedHandler,
        resetInputHandler: resetDescriptionHandler
    } = useInput(validateDescription);


    let formIsValid = false;

    if( 
        categoryIsValid &&
        titleIsValid && 
        addressIsValid &&
        zipIsValid && 
        cityIsValid &&
        dateIsValid && 
        timeIsValid &&
        feeIsValid &&
        maxIsValid && 
        descriptionIsValid
      ) {
        formIsValid = true;
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if(!formIsValid) {
            return;
        };

        const category = sport;
        const title = titleValue;
        const address = addressValue;
        const zip = zipValue;
        const city = cityValue;
        const date = dateValue;
        const time = timeValue;
        const fee = feeValue;
        const max = maxValue;
        const description = descriptionValue;

        console.log({
            category,
            title,
            address,
            zip,
            city,
            date,
            time,
            fee,
            max,
            description
        });

        categoryRef.current.defaultOption()
        resetTitleHandler();
        resetAddressHandler();
        resetZipHandler();
        resetCityHandler();
        resetDateHandler();
        resetTimeHandler();
        resetFeeHandler();
        resetMaxHandler();
        resetDescriptionHandler();

    };


    return(
        <div className={classes.grid}>
            <p>Create a new event</p>
            <form onSubmit={submitHandler}>
                <CardsSelectFilter 
                    onChange={changeCategoryHandler}
                    name="selectSport"
                    defaultOption="Select category"
                    options={sportCategories}
                    ref={categoryRef}
                />
                {!categoryIsValid && <p className={classes.error}>Please insert a valid category.</p>}
                <input 
                    className={classes.input} 
                    type="text" placeholder="Title" 
                    onChange={() => changeTitleHandler(titleRef.current.value)}
                    onBlur={titleTouchedHandler}
                    value={titleValue}
                    ref={titleRef} 
                />
                {titleHasError && <p className={classes.error}>Please insert a valid title.</p>}
                <input 
                    className={classes.input} 
                    type="text" placeholder="Address" 
                    onChange={() => changeAddressHandler(addressRef.current.value)}
                    onBlur={addressTouchedHandler}
                    value={addressValue}
                    ref={addressRef}
                />
                {addressHasError && <p className={classes.error}>Please insert an valid address.</p>}
                <div>
                    <input 
                        className={classes.input} 
                        type="text" placeholder="Zip" 
                        onChange={() => changeZipHandler(zipRef.current.value)}
                        onBlur={zipTouchedHandler}
                        value={zipValue}
                        ref={zipRef}
                    />
                    <input 
                        className={classes.input} 
                        type="text" placeholder="City"
                        onChange={() => changeCityHandler(cityRef.current.value)}
                        onBlur={cityTouchedHandler}
                        value={cityValue} 
                        ref={cityRef}
                    />
                </div>
                {(zipHasError || cityHasError) && <div>
                    <p className={classes.error}>{zipHasError && "Please insert a valid zip."}</p>
                    <p className={classes.error}>{cityHasError && "Please insert a valid city."}</p>
                </div>}
                <div>
                    <input 
                        className={`${classes.input} ${classes.timeInput}`} 
                        type="date" 
                        min="2022-03-26"
                        onChange={() => changeDateHandler(dateRef.current.value)}
                        onBlur={dateTouchedHandler}
                        value={dateValue}  
                        ref={dateRef}
                    />
                    <input 
                        className={`${classes.input} ${classes.timeInput}`} 
                        type="time" 
                        onChange={() => changeTimeHandler(timeRef.current.value)}
                        onBlur={timeTouchedHandler}
                        value={timeValue} 
                        ref={timeRef}
                    />
                </div>
                {(dateHasError || timeHasError) && <div>
                    <p className={classes.error}>{dateHasError && "Please insert a valid date."}</p>
                    <p className={classes.error}>{timeHasError && "Please insert a valid time."}</p>
                </div>}
                <div>
                    <input 
                        className={classes.input} 
                        type="number" 
                        placeholder="Fee / subscriber" 
                        onChange={() => changeFeeHandler(feeRef.current.value)}
                        onBlur={feeTouchedHandler}
                        value={feeValue} 
                        ref={feeRef}
                    />
                    <input 
                        className={classes.input} 
                        type="number" 
                        placeholder="Max subscribers" 
                        onChange={() => changeMaxHandler(maxRef.current.value)}
                        onBlur={maxTouchedHandler}
                        value={maxValue} 
                        ref={maxRef}
                    />
                </div>
                {(feeHasError || maxHasError) && <div>
                    <p className={classes.error}>{feeHasError && "Please insert a valid fee."}</p>
                    <p className={classes.error}>{maxHasError && "Please insert a valid limit."}</p>
                </div>}
                <textarea 
                    className={classes.textarea} 
                    rows="5" 
                    maxLength="300"
                    placeholder="Description"
                    onChange={() => changeDescriptionHandler(descriptionRef.current.value)}
                    onBlur={descriptionTouchedHandler}
                    value={descriptionValue}  
                    ref={descriptionRef}
                />
                {descriptionHasError && <p className={classes.error}>Please insert a valid fee.</p>}
                <Button type="submit">Create Event</Button>
            </form>
        </div>
    );
};

export default Create;