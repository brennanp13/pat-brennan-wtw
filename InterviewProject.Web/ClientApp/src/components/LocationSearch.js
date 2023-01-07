import React, { useState } from 'react';

const LocationSearch = (props) => {
    const [postalCode, setPostalCode] = useState('');

    const handlePostalCodeInputChance = (event) => {
        setPostalCode(event.target.value);
    }

    return (
        <div>
            <form onSubmit={event => props.handleSubmit(event, postalCode)}>
                <input
                    onChange={handlePostalCodeInputChance}
                    value={postalCode}
                    placeholder='Enter Postal Code'
                    name='postalCode'
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default LocationSearch;