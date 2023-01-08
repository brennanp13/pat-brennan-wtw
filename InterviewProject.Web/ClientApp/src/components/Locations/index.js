import React from 'react';

import './styles.css'

const Locations = (props) => {
    if (props.isLoading) {
        return <div data-testid={'locations-loading'}>Loading</div>;
    }
    if (props.locations.length > 0) {
        return (
            <div data-testid={'locations-list'} className='location-list'>
                <div>More than one location was retured from you result, please select a location:</div>
                <ul>
                    {props.locations.map(location =>
                        <li key={location.key}>
                            <a onClick={() => props.handleLocationClicked(location.key, location.name)}>{location.name}</a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

    return null;
}

export default Locations;