import React from 'react';

const ForecastDay = (props) => {
    return (
        <div>
            <div>Date: props.Date</div>
            <div>High Temp: {props.HighTemperature}</div>
            <div>Low Temp: {props.LowTemperature}</div>
        </div>
    )
}

export default ForecastDay;