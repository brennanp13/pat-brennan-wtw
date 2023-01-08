import axios from 'axios';

export function GetByLocationByPostalCode(postalCode, setLocations, setIsLoading) {
    axios.get('weatherforecast/GetByLocationByPostalCode?postalCode=' + postalCode)
        .then((response) => {
            console.log('weatherforecast response', response.data);
            if (setLocations) {
                setLocations(response.data);
            }
            return response.data;
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        })
        .finally(() => {
            if (setIsLoading) {
                setIsLoading(false);
            }
        });
}

export function GetByLocation(locationKey, setForecast) {
    axios.get('weatherforecast/GetByLocation?locationKey=' + locationKey)
        .then((response) => {
            console.log('weatherforecast response', response.data);
            if (setForecast) {
                setForecast(response.data);
            }
            return response.data;
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        })
}