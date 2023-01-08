import React from 'react';


const Locations = (props) => {
    console.log(props);
    if (props.areLocationsLoading) {
        return <div>Loading</div>;
    }
    if (props.locations.length > 1) {
        return (
            <div>
                <div>Please select a location:</div>
                <ul>
                    {props.locations.map(location =>
                        <li key={location.key}>
                            <a onClick={() => props.handleLocationClicked(location.key)}>{location.name}</a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

    return null;
}

export default Locations;