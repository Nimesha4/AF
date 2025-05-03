import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { Countries } from './Countries'; // Adjust path as needed
import axiosMock from 'axios-mock-adapter';

// Mock axios globally
jest.mock('axios');

// Set up a mock for axios
const mock = new axiosMock(axios);

describe('Countries Component', () => {
  
  // Test case for fetching countries
  it('should fetch countries data and display it', async () => {
    // Mocking axios.get response
    const mockCountries = [
      { name: { common: 'India' }, flags: { png: '/path/to/india-flag.png' }, region: 'Asia' },
      { name: { common: 'Canada' }, flags: { png: '/path/to/canada-flag.png' }, region: 'Americas' }
    ];
    mock.onGet('/countries').reply(200, mockCountries);
    
    // Render the Countries component
    render(<Countries />);
    
    // Wait for the countries data to load
    await waitFor(() => screen.getByText(/India/i));
    await waitFor(() => screen.getByText(/Canada/i));
    
    // Check if the country names are displayed
    expect(screen.getByText(/India/i)).toBeInTheDocument();
    expect(screen.getByText(/Canada/i)).toBeInTheDocument();
  });

  // Test case for search functionality
  it('should search countries by name', async () => {
    const mockCountry = { name: { common: 'India' }, flags: { png: '/path/to/india-flag.png' }, region: 'Asia' };
    mock.onGet('/countries/name/India').reply(200, mockCountry);
    
    // Render the Countries component
    render(<Countries />);
    
    // Simulate entering search term
    fireEvent.change(screen.getByPlaceholderText(/Search/i), { target: { value: 'India' } });
    
    // Simulate clicking the search button
    fireEvent.click(screen.getByText(/Search/i));
    
    // Wait for the search result to appear
    await waitFor(() => screen.getByText(/India/i));
    
    // Check if the searched country is displayed
    expect(screen.getByText(/India/i)).toBeInTheDocument();
  });

  // Test case for handling error during data fetching
  it('should display an error message if fetching fails', async () => {
    // Mocking axios.get to simulate an error
    mock.onGet('/countries').reply(500);
    
    // Render the Countries component
    render(<Countries />);
    
    // Check if error message is displayed
    await waitFor(() => screen.getByText(/Failed to fetch countries/i));
    expect(screen.getByText(/Failed to fetch countries/i)).toBeInTheDocument();
  });

  // Test case for handling empty search results
  it('should display a message when no country is found', async () => {
    const mockErrorResponse = { message: 'Country not found' };
    mock.onGet('/countries/name/UnknownCountry').reply(404, mockErrorResponse);
    
    // Render the Countries component
    render(<Countries />);
    
    // Simulate entering search term
    fireEvent.change(screen.getByPlaceholderText(/Search/i), { target: { value: 'UnknownCountry' } });
    
    // Simulate clicking the search button
    fireEvent.click(screen.getByText(/Search/i));
    
    // Wait for error message to appear
    await waitFor(() => screen.getByText(/Failed to find country/i));
    
    // Check if error message is displayed
    expect(screen.getByText(/Failed to find country/i)).toBeInTheDocument();
  });
  
  // Test case for handling favorite toggle
  it('should toggle the favorite status of a country', async () => {
    const mockCountry = { name: { common: 'India' }, flags: { png: '/path/to/india-flag.png' }, region: 'Asia' };
    mock.onGet('/countries').reply(200, [mockCountry]);
    
    // Render the Countries component
    render(<Countries />);
    
    // Wait for the country data to load
    await waitFor(() => screen.getByText(/India/i));
    
    // Simulate clicking the favorite button
    fireEvent.click(screen.getByText(/Add to Favorites/i));  // Adjust button text if needed
    
    // Check if the country has been added to favorites
    expect(screen.getByText(/Remove from Favorites/i)).toBeInTheDocument();
  });
});
