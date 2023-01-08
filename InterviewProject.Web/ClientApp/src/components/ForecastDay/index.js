import React from 'react';
import moment from 'moment'

import './styles.css'

const ForecastDay = (props) => {
    console.log("Forecast day props", props);
    // would not do this in production, but rather download the assets locally
    const iconUrl = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${props.forecastDay.dayIcon}-s.png`;

    return (
        <div className='forecast-day-container'>
            <div className='forecast-day-date'>{moment(props.forecastDay.date).format('ddd, MMM D')}</div>
            <span className='forecast-day-high'>{props.forecastDay.highTemperature}°</span>
            <span>/</span>
            <span className='forecast-day-low'>{props.forecastDay.lowTemmperature}°</span>
            <div>
                <img src={iconUrl} />
            </div>
        </div>
    )
}

export default ForecastDay;