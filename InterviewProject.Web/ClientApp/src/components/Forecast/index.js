import React, { Component, useState, useEffect } from 'react';
import LocationSerach from '../LocationSearch';
import { GetByLocationByPostalCode, GetByForecastByLocation } from '../../api/WeatherAPI';
import Locations from '../Locations';
import ForecastDays from '../ForecastDays';

const Forecast = () => {
    const [locations, setLocations] = useState([]);
    const [locationName, setLocationName] = useState('');
    const [locationSearchHasError, setLocationSearchHasError] = useState(false);

    const [noLocationsFoundError, setNoLocationsFoundError] = useState(false);

    const [displayLocaitons, setDisplayLocations] = useState(false);
    const [areLocationsLoading, setAreLocationsLoading] = useState(false);

    const [forecastDays, setForecastDays] = useState([]);
    const [displayForecastDays, setDisplayForecastDays] = useState(false);
    const [areForecastDaysLoading, setAreForecastDaysLoading] = useState(false);
    const [forecastDaysHasErrors, setForecastDaysHasErrors] = useState(false);

    const [wasSearchClicked, setWasSearchClicked] = useState(false);

    useEffect(() => {
        if (wasSearchClicked) {
            setWasSearchClicked(false);

            ; if (locations.length === 1) {
                setLocationName(locations[0].name);
                setForecastDaysHasErrors(false);
                GetByForecastByLocation(locations[0].locationKey, setForecastDays, setAreForecastDaysLoading);
                setAreLocationsLoading(false);
                setDisplayLocations(false);
                setDisplayForecastDays(true);
            }
            else if (locations.length === 0) {
                setNoLocationsFoundError(true);
                setDisplayLocations(true);
            }
            else {
                setDisplayLocations(true);
            }
        }
    }, [locations])

    const handlePostalCodeSubmit = (event, postalCode) => {
        event.preventDefault();
        setAreLocationsLoading(true);
        setLocationSearchHasError(false);
        GetByLocationByPostalCode(postalCode, setLocations, setAreLocationsLoading, setLocationSearchHasError);
        setDisplayForecastDays(false);
        setWasSearchClicked(true);
    }

    const handleLocationClicked = (locationKey, locationName) => {
        setDisplayForecastDays(true);
        setAreForecastDaysLoading(true);
        setDisplayLocations(false);
        setForecastDaysHasErrors(false);
        setLocationName(locationName);
        GetByForecastByLocation(locationKey, setForecastDays, setAreForecastDaysLoading, setForecastDaysHasErrors);
    }

    return (
        <div>
            <LocationSerach handleSubmit={handlePostalCodeSubmit} isLoading={areLocationsLoading} hasError={locationSearchHasError} />
            {displayLocaitons && <Locations locations={locations} handleLocationClicked={handleLocationClicked} noLocationsFoundError={noLocationsFoundError} />}
            {displayForecastDays && <ForecastDays locationName={locationName} forecastDays={forecastDays} isLoading={areForecastDaysLoading} hasError={forecastDaysHasErrors} />}
        </div>
    )
}

export default Forecast;