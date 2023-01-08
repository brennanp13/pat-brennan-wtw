import React from 'react';
import moment from 'moment'

import './ForecastDay.css'

const ForecastDay = (props) => {
    console.log("Forecast day props", props);
    return (
        <div className='forecast-day-container'>
            <div>{moment(props.forecastDay.date).format('dddd, MMMM D, YYYY')}</div>
            <div>High Temp: {props.forecastDay.highTemperature}</div>
            <div>Low Temp: {props.forecastDay.lowTemperature}</div>
        </div>
    )
}

export default ForecastDay;