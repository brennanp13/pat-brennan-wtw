import React from 'react';
import ForecastDay from './ForecastDay';

import './ForecastDays.css'

const ForecastDays = (props) => {
    if (props.isLoading) {
        return <div>Loading</div>;
    }
    if (props.forecastDays.length > 0) {
        return (
            <div className='forecast-days-container'>
                {props.forecastDays.map(forecastDay =>
                    <ForecastDay forecastDay={forecastDay} key={forecastDay.date} />
                )}
            </div>
        )
    }

    return null;
}

export default ForecastDays;