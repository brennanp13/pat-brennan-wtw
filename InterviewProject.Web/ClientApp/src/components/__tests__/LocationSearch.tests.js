import { cleanup, fireEvent, render } from '@testing-library/react';
import LocationSearch from '../LocationSearch';

test('test', () => {
    expect(true).toBe(true);
});

describe(Locations, () => {
    it('should render locations loading text', () => {
        render(<LocationSerach handleSubmit={() => { }} isLoading={true} />);
        const loadingElement = screen.getByTestId('locations-loading');
        expect(loadingElement).toBeInTheDocument();
    });
});

//test('should render locations loading screen', () => {
//    render(<Locations locations={[]} isLoading={true} handleLocationClicked={() => { }} />);
//    const loadingElement = screen.getByTestId('locations-loading');
//    expect(loadingElement).toBeInTheDocument();
//});

//test('should render locations list', () => {
//    const locations = [
//        { key: 1, name: "Philly" },
//        { key: 2, name: "New York" }
//    ]

//    render(<Locations locations={locations} isLoading={false} handleLocationClicked={() => { }} />);
//    const loadingElement = screen.getByTestId('locations-list');
//    expect(loadingElement).toBeInTheDocument();
//});