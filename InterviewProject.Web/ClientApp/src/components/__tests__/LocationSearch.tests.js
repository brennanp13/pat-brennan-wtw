
import React from 'react';
import '@testing-library/jest-dom'
import LocationSearch from '../LocationSearch';
import { render, screen } from "@testing-library/react";


describe('Location Search', () => {
    it('should render locations loading text', () => {
        const { getByTestId } = render(<LocationSearch handleSubmit={() => { }} isLoading={true} hasError={false}/>);
        expect(getByTestId('locations-loading')).toBeInTheDocument();
    });

    it('should render locations search text', () => {
        const { getByTestId } = render(<LocationSearch handleSubmit={() => { }} isLoading={false} hasError={false}/>);
        expect(getByTestId('locations-search')).toBeInTheDocument();
    });

    it('should render error message', () => {
        const { getByTestId } = render(<LocationSearch handleSubmit={() => { }} isLoading={false} hasError={true} />);
        expect(getByTestId('locations-search-error')).toBeInTheDocument();
    });
});
