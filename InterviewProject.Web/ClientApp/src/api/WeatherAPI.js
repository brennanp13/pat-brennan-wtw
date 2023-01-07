import axios from 'axios';

export function GetByLocationByPostalCode(postalCode, setLocations) {
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
}