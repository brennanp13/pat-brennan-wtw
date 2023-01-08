import React, { useState } from 'react';

const LocationSearch = (props) => {
    const [postalCode, setPostalCode] = useState('');

    const handlePostalCodeInputChance = (event) => {
        setPostalCode(event.target.value);
    }

    return (
        <div className='row'>
            <form onSubmit={event => props.handleSubmit(event, postalCode)}>
                <div className='input-group mb-3 col-xs-3'>
                    <input
                        onChange={handlePostalCodeInputChance}
                        value={postalCode}
                        placeholder='Enter Postal Code'
                        name='postalCode'
                        className='form-control input-lg'
                        required
                    />
                    <div class='input-group-append'>
                        {props.isLoading ? <button class='btn btn-outline-secondary' data-testId='locations-loading'>Loading...</button> : <button class='btn btn-outline-secondary' type='submit' data-testId='locations-search'>Seach</button>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LocationSearch;