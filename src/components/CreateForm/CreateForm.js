import React, { useContext, useRef } from "react";

import DataContext from "../../context/DataContext";
import useInput from "../../hooks/useInput";

import Button from "../Button/Button";
import CardsSelectFilter from "../CardsSelectFilter/CardsSelectFilter";

import classes from './CreateForm.module.css';

const CreateForm = (props) => {
    
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


    const ctx =  useContext(DataContext);

    const sportCategories = ctx.sports.map(sport => {
        return {
            value: sport.link,
            title: sport.name
        }
    });


    const validateCategory = (value) => value !== "" && value !== "Select category";
    const validateTitle = (value) => value.trim() !== "";
    const validateAddress = (value) => value.trim().match(/[a-zA-ZäöüÄÖÜß .]+ [0-9]+[a-zA-Z]?/);
    const validateZip = (value) => value.trim().match(/\b\d{5}\b/g);
    const validateCity = (value) => value.trim().match(/^[a-zA-ZäöüÄÖÜß ',.\s-]{2,}$/);
    const validateDate = (value) => {
        return new Date((new Date().getUTCFullYear()) + "/" + 
        (new Date().getMonth() + 1)+ "/" + 
        (new Date().getUTCDate())) <= new Date(value)
    };
    const validateTime = (value) => value.trim() !== "";
    const validateFee = (value) => value !== "" && value >= 0;
    const validateMax = (value) => value >= 1;
    const validateDescription = (value) => value.trim().length >= 0;


    const {
        enteredValue: categoryValue,
        valueIsValid: categoryIsValid,
        inputHasError: categoryHasError,
        changeValueHandler: changeCategoryHandler,
        touchedHandler: categoryTouchedHandler,
        resetInputHandler: resetCategoryHandler
    } = useInput(validateCategory);

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

        categoryTouchedHandler();
        titleTouchedHandler();
        addressTouchedHandler();
        zipTouchedHandler();
        cityTouchedHandler();
        dateTouchedHandler();
        timeTouchedHandler();
        feeTouchedHandler();
        maxTouchedHandler();
        descriptionTouchedHandler();

        if(!formIsValid) {
            return;
        };

        const category = categoryValue.toLowerCase();
        const title = titleValue;
        const address = addressValue;
        const zip = zipValue;
        const city = cityValue;
        const splittedDate = dateValue.split("-");
        const date = `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`;
        const time = timeValue;
        const fee = +(feeValue.replace(",","."));
        const max = +maxValue;
        const description = descriptionValue;

        const eventData = {
            category,
            title,
            date,
            time,
            price: fee,
            address,
            zip,
            city,
            limit: max,
            text: description,
        };

        props.onCreateEvent(eventData);

        // categoryRef.current.defaultOption();
        // resetCategoryHandler();
        // resetTitleHandler();
        // resetAddressHandler();
        // resetZipHandler();
        // resetCityHandler();
        // resetDateHandler();
        // resetTimeHandler();
        // resetFeeHandler();
        // resetMaxHandler();
        // resetDescriptionHandler();

    };
    
    const btnClickHandler = () => {
        if(formIsValid) {
            props.btnClick();
        };
    };

    const dateObj = new Date();
    const currentDate = 
    `${dateObj.getFullYear()}-${dateObj.getMonth() >= 9 ? dateObj.getMonth() + 1 : "0" + (dateObj.getMonth() + 1)}-${dateObj.getDate()}`;

    return(
        <div className={classes.grid}>
            <form onSubmit={submitHandler} onFocus={props.onFocus}>
                <CardsSelectFilter 
                    className={`${classes.input} ${categoryHasError && classes.invalidInput}`}
                    onChange={changeCategoryHandler}
                    onBlur={categoryTouchedHandler}
                    name="selectSport"
                    defaultOption="Select category"
                    options={sportCategories}
                    ref={categoryRef}
                />
                {categoryHasError && <p className={classes.error}>Please choose a category.</p>}
                <input 
                    className={`${classes.input} ${titleHasError && classes.invalidInput}`} 
                    type="text" placeholder="Title" 
                    onChange={() => changeTitleHandler(titleRef.current.value)}
                    onBlur={titleTouchedHandler}
                    value={titleValue}
                    ref={titleRef} 
                />
                {titleHasError && <p className={classes.error}>Please insert a valid title.</p>}
                <input 
                    className={`${classes.input} ${addressHasError && classes.invalidInput}`} 
                    type="text" placeholder="Address" 
                    onChange={() => changeAddressHandler(addressRef.current.value)}
                    onBlur={addressTouchedHandler}
                    value={addressValue}
                    ref={addressRef}
                />
                {addressHasError && <p className={classes.error}>Please insert an valid address.</p>}
                <div>
                    <input 
                        className={`${classes.input} ${zipHasError && classes.invalidInput}`} 
                        type="number" placeholder="Zip" 
                        onChange={() => changeZipHandler(zipRef.current.value)}
                        onBlur={zipTouchedHandler}
                        value={zipValue}
                        ref={zipRef}
                    />
                    <input 
                        className={`${classes.input} ${cityHasError && classes.invalidInput}`} 
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
                        className={`${classes.input} ${classes.timeInput} ${dateHasError && classes.invalidInput}`} 
                        type="date" 
                        min={currentDate}
                        max="2022-12-31"
                        onChange={() => changeDateHandler(dateRef.current.value)}
                        onBlur={dateTouchedHandler}
                        value={dateValue}  
                        ref={dateRef}
                    />
                    <input 
                        className={`${classes.input} ${classes.timeInput} ${timeHasError && classes.invalidInput}`} 
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
                    <div className={classes.feeWrapper}>
                        <input 
                            className={`${classes.input} ${feeHasError && classes.invalidInput}`} 
                            type="number" 
                            min="0"
                            step="0.01"
                            placeholder="Fee / subscriber" 
                            onChange={() => changeFeeHandler(feeRef.current.value)}
                            onBlur={feeTouchedHandler}
                            value={feeValue} 
                            ref={feeRef}
                        />
                        <span className={classes.currency}>€</span>
                    </div>
                    <div>
                        <input 
                            className={`${classes.input} ${maxHasError && classes.invalidInput}`} 
                            type="number" 
                            min="1"
                            placeholder="Max subscribers" 
                            onChange={() => changeMaxHandler(maxRef.current.value)}
                            onBlur={maxTouchedHandler}
                            value={maxValue} 
                            ref={maxRef}
                        />
                    </div>
                </div>
                {(feeHasError || maxHasError) && <div>
                    <p className={classes.error}>{feeHasError && "Insert 0 if it's for free."}</p>
                    <p className={classes.error}>{maxHasError && "At least 1 subscriber needed."}</p>
                </div>}
                <textarea 
                    className={`${classes.input} ${classes.textarea} ${descriptionHasError && classes.invalidInput}`} 
                    rows="5" 
                    maxLength="300"
                    placeholder="Event description"
                    onChange={() => changeDescriptionHandler(descriptionRef.current.value)}
                    onBlur={descriptionTouchedHandler}
                    value={descriptionValue}  
                    ref={descriptionRef}
                />
                {descriptionHasError && <p className={classes.error}>Please insert a valid description.</p>}
                <Button type="submit" onClick={btnClickHandler}>Create Event</Button>
            </form>
        </div>
    );
};

export default CreateForm;