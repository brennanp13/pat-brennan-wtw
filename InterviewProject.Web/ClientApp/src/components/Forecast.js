import React from 'react';
import LocationSerach from './LocationSearch';

const Forecast = () => {
    return (
        <div>
            Forecast <br/>
            <LocationSerach handleSubmit={handleSubmit}/>
        </div>
    )
}

export default Forecast;