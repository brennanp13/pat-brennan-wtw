import React from 'react';
import ForecastDay from './ForecastDay';

const ForecastDays = (props) => {
    if (!props.forecastDays) {
        return null;
    }

    return (
        <div>
            {props.forecastDays.map(forecastDay =>
                <ForecastDay forecastDay={forecastDay} />
            )}
        </div>
    )
}

export default ForecastDays;