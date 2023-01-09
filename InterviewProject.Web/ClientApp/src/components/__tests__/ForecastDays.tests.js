import React from 'react';
import '@testing-library/jest-dom'
import ForecastDays from '../ForecastDays';
import { render, screen } from "@testing-library/react";


describe('Location Search', () => {
    it('should render loading text', () => {
        const { getByTestId } = render(<ForecastDays locationName={'test'} forecastDays={[]} isLoading={true} hasError={false} />);
        expect(getByTestId('forecastdays-loading')).toBeInTheDocument();
    });

    it('should display location and forecast', () => {
        const locationName = 'test location name';
        const forecastDays = [
            { date: "1/1/2023", highTemperature: 90, lowTemmperature: 40, phrase: "Test phrase 1" },
            { date: "1/2/2023", highTemperature: 91, lowTemmperature: 41, phrase: "Test phrase 2" },
            { date: "1/3/2023", highTemperature: 92, lowTemmperature: 42, phrase: "Test phrase 3" },
            { date: "1/4/2023", highTemperature: 93, lowTemmperature: 43, phrase: "Test phrase 4" },
            { date: "1/5/2023", highTemperature: 94, lowTemmperature: 44, phrase: "Test phrase 5" }
        ]

        render(<ForecastDays locationName={locationName} forecastDays={forecastDays} isLoading={false} hasError={false} />);
        expect(getByTestId('forecastdays-list')).toBeInTheDocument();
        expect(getByText(locationName)).toBeInTheDocument();
    });

    it('should render error message', () => {
        render(<ForecastDays locationName={'test'} forecastDays={[]} isLoading={false} hasError={true} />);
        expect(getByTestId('forecastdays-error')).toBeInTheDocument();
    });
});
