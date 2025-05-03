import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

// Controller for fetching all countries
export const getAllCountries = async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

// Controller for fetching country by name
export const getCountriesByName = async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch country: ${name}` });
  }
};

// Controller for fetching countries by region
export const getCountriesByRegion = async (req, res) => {
  const { region } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/region/${region}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch countries in region: ${region}` });
  }
};

// Controller for fetching country by alpha code
export const getCountryByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/alpha/${code}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch country by code: ${code}` });
  }
};

// Controller for fetching countries by region code
export const getCountriesByRegionCode = async (req, res) => {
  const { code } = req.params;
  try {
    const allCountriesResponse = await axios.get(`${API_BASE_URL}/all`);
    const filteredCountries = allCountriesResponse.data.filter(
      country => country.region?.toLowerCase() === code.toLowerCase()
    );
    res.json(filteredCountries);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch countries with region code: ${code}` });
  }
};
