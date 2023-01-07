import React from 'react';


const Locations = (props) => {
    if (!props.locations) {
        return null;
    }

    return (
        <div>
            <div>Please select a location:</div>
            <ul>
                {props.locations.map(location =>
                    <li key={location.key}>
                        <span>{location.name}</span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Locations;