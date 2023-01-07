import React, { Component, useState } from 'react';
import LocationSerach from './LocationSearch';
import { GetByLocationByPostalCode } from '../api/WeatherAPI';
import Locations from './Locations';

const Forecast = () => {
    const [locations, setLocations] = useState([]);


    const handleSubmit = (event, postalCode) => {
        event.preventDefault();
        GetByLocationByPostalCode(postalCode, setLocations);
    }

    return (
        <div>
            Forecast <br />
            <LocationSerach handleSubmit={handleSubmit} />
            {locations.length > 1 ? <Locations locations={locations} /> : null}
        </div>
    )
}

export default Forecast;