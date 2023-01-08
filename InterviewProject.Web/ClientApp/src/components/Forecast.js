import React, { Component, useState, useEffect } from 'react';
import LocationSerach from './LocationSearch';
import { GetByLocationByPostalCode, GetByForecastByLocation } from '../api/WeatherAPI';
import Locations from './Locations';
import ForecastDays from './ForecastDays';

const Forecast = () => {
    const [locations, setLocations] = useState([]);
    const [areLocationsLoading, setAreLocationsLoading] = useState(false);

    const [forecastDays, setForecastDays] = useState([]);
    const [areForecastDaysLoading, setAreForecastDaysLoading] = useState(false);

    const handlePostalCodeSubmit = (event, postalCode) => {
        event.preventDefault();
        setAreLocationsLoading(true);
        GetByLocationByPostalCode(postalCode, setLocations, setAreLocationsLoading);
    }

    const handleLocationClicked = (locationKey) => {
        setAreForecastDaysLoading(true);
        GetByForecastByLocation(locationKey, setForecastDays, setAreForecastDaysLoading);
    }

    return (
        <div>
            Forecast <br />
            <LocationSerach handleSubmit={handlePostalCodeSubmit} />
            {<Locations locations={locations} handleLocationClicked={handleLocationClicked} areLocationsLoading={areLocationsLoading} />}
            {<ForecastDays forecastDays={forecastDays} isLoading={areForecastDaysLoading} />}
        </div>
    )
}

export default Forecast;