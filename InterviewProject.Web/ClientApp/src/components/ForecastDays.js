import React from 'react';
import ForecastDay from './ForecastDay';

const ForecastDays = (props) => {
    if (props.isLoading) {
        return <div>Loading</div>;
    }
    if (props.forecastDays.length > 0) {
        return (
            <div>
                {props.forecastDays.map(forecastDay =>
                    <ForecastDay forecastDay={forecastDay} key={forecastDay.date} />
                )}
            </div>
        )
    }

    return null;
}

export default ForecastDays;