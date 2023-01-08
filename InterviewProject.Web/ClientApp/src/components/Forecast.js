import React, { Component, useState, useEffect } from 'react';
import LocationSerach from './LocationSearch';
import { GetByLocationByPostalCode } from '../api/WeatherAPI';
import Locations from './Locations';
import ForecastDays from './ForecastDays';

const Forecast = () => {
    const [locations, setLocations] = useState([]);
    const [areLocationsLoading, setAreLocationsLoading] = useState(false);
    const [locationKey, setLocationKey] = useState('');
    const [forecastDays, setForecastDays] = useState([]);

    const handlePostalCodeSubmit = (event, postalCode) => {
        event.preventDefault();
        setAreLocationsLoading(true);
        GetByLocationByPostalCode(postalCode, setLocations, setAreLocationsLoading);
    }

    const handleLocationClicked = (locationKey) => {
        console.log(locationKey);
        setLocationKey(locationKey);
    }

    return (
        <div>
            Forecast <br />
            <LocationSerach handleSubmit={handlePostalCodeSubmit} />
            {<Locations locations={locations} handleLocationClicked={handleLocationClicked} areLocationsLoading={areLocationsLoading} />}
            {<ForecastDays forecastDays={forecastDays} />}
        </div>
    )
}

export default Forecast;