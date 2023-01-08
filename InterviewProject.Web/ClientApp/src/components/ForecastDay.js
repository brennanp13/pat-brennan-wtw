import React from 'react';

const ForecastDay = (props) => {
    console.log("Forecast day props", props);
    return (
        <div>
            <div>Date: {props.forecastDay.date}</div>
            <div>High Temp: {props.forecastDay.highTemperature}</div>
            <div>Low Temp: {props.forecastDay.lowTemperature}</div>
        </div>
    )
}

export default ForecastDay;