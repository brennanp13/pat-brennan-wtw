import React from 'react';
import '@testing-library/jest-dom'
import Locations from '../Locations';
import { render, screen } from "@testing-library/react";


describe('Locations', () => {
    it('should render locations list', () => {
        const locations = [
            { key: 1, name: "Philly" },
            { key: 2, name: "New York" }
        ]
        
        render(<Locations locations={locations} isLoading={false} handleLocationClicked={() => { }} noLocationsFoundError={false}/>);
        const locationList = screen.getByTestId('locations-list');
        expect(locationList).toBeInTheDocument();
    });

    it('should render no locations found message', () => {
        const locations = []

        render(<Locations locations={locations} isLoading={false} handleLocationClicked={() => { }} noLocationsFoundError={true} />);
        const locationsNoneFound = screen.getByTestId('locations-none-found');
        expect(locationsNoneFound).toBeInTheDocument();
    });

});
