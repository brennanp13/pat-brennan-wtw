import React from 'react';
import ForecastDay from '../ForecastDay';

import './styles.css'

const ForecastDays = (props) => {
    if (props.isLoading) {
        return <div>Loading</div>;
    }
    if (props.forecastDays.length > 0) {
        return (
            <div>
                <h1>5 day forecast for {props.locationName}</h1>
                <div className='forecast-days-container'>
                    {props.forecastDays.map(forecastDay =>
                        <ForecastDay forecastDay={forecastDay} key={forecastDay.date} />
                    )}
                </div>
            </div>
        )
    }

    return null;
}

export default ForecastDays;