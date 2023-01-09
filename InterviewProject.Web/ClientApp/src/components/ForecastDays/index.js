import React from 'react';
import ForecastDay from '../ForecastDay';

import './styles.css'

const ForecastDays = (props) => {
    if (props.isLoading) {
        return <div data-testid='forecastdays-loading'>Loading</div>;
    }
    if (props.forecastDays.length > 0) {
        return (
            <div data-testid='forecastdays-list'>
                <h1>5 day forecast for {props.locationName}</h1>
                <div className='forecast-days-container'>
                    {props.forecastDays.map(forecastDay =>
                        <ForecastDay forecastDay={forecastDay} key={forecastDay.date} />
                    )}
                </div>
            </div>
        )
    }

    if (props.hasError) {
        return <span data-testid='forecastdays-error'>There was an error getting the forecast</span>;
    }

    return null;
}

export default ForecastDays;