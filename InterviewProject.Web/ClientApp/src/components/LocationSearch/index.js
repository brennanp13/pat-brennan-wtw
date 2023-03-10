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
                    <label className="col-form-label mr-3">Enter Postal Code:   </label>
                    <input
                        onChange={handlePostalCodeInputChance}
                        value={postalCode}
                        placeholder='Postal Code'
                        name='postalCode'
                        className='form-control input-lg'
                        required
                    />
                    <div className='input-group-append'>
                        {props.isLoading ? <button className='btn btn-outline-secondary' data-testid='locations-loading'>Loading...</button> : <button className='btn btn-outline-secondary' type='submit' data-testid='locations-search'>Seach</button>}
                    </div>
                    {props.hasError && <span data-testid='locations-search-error'>There was an error searching for the postal code</span>}
                </div>
            </form>
        </div>
    )
}

export default LocationSearch;