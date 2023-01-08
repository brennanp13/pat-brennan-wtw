import React, { Component, useState, useEffect } from 'react';
import LocationSerach from '../LocationSearch';
import { GetByLocationByPostalCode, GetByForecastByLocation } from '../../api/WeatherAPI';
import Locations from '../Locations';
import ForecastDays from '../ForecastDays';

const Forecast = () => {
    const [locations, setLocations] = useState([]);
    const [locationName, setLocationName] = useState('');
    const [displayLocaitons, setDisplayLocations] = useState(false);
    const [areLocationsLoading, setAreLocationsLoading] = useState(false);

    const [forecastDays, setForecastDays] = useState([]);
    const [areForecastDaysLoading, setAreForecastDaysLoading] = useState(false);

    const handlePostalCodeSubmit = (event, postalCode) => {
        event.preventDefault();
        setAreLocationsLoading(true);
        setDisplayLocations(true);
        GetByLocationByPostalCode(postalCode, setLocations, setAreLocationsLoading);
    }

    const handleLocationClicked = (locationKey, locationName) => {
        setAreForecastDaysLoading(true);
        setDisplayLocations(false);
        setLocationName(locationName);
        GetByForecastByLocation(locationKey, setForecastDays, setAreForecastDaysLoading);
    }

    return (
        <div>
            Forecast <br />
            <LocationSerach handleSubmit={handlePostalCodeSubmit} />
            {displayLocaitons && <Locations locations={locations} handleLocationClicked={handleLocationClicked} isLoading={areLocationsLoading} />}
            {<ForecastDays locationName={locationName} forecastDays={forecastDays} isLoading={areForecastDaysLoading} />}
        </div>
    )
}

export default Forecast;