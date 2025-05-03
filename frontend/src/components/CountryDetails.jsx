import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const CountryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state?.country;

  if (!country) return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gradient-to-b from-red-100 to-blue-100 flex items-center justify-center">
        <div className="text-3xl font-bold text-gray-800 p-8 bg-white/80 backdrop-blur rounded-lg shadow-xl animate-pulse">
          Country not found
        </div>
      </div>
      <Footer />
    </div>
  );

  // Format population with commas
  const formattedPopulation = country.population?.toLocaleString();
  
  // Get languages as array
  const languages = country.languages ? Object.values(country.languages) : [];
  
  // Get currencies as array
  const currencies = country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || '—'})`) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Flag header with parallax effect */}
        <div className="relative h-96 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
          <img
            src={country.flags?.png || country.flags?.svg}
            alt={`${country.name.common} flag`}
            className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
          />
          
          <div className="absolute bottom-0 left-0 p-8 w-full z-20">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg">
                {country.name.common}
              </h1>
              <p className="text-xl text-white/90 font-medium">{country.name.official}</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/countries')} 
            className="absolute top-6 left-6 bg-white/30 hover:bg-white/80 text-white hover:text-blue-800 backdrop-blur px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg z-20 flex items-center gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Countries
          </button>
        </div>

        {/* Main content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30 pb-12">
          {/* Stats cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Location Card */}
            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white hover:border-blue-100">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Location</h2>
              </div>
              
              <div className="space-y-5">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Region</p>
                  <p className="text-lg font-medium text-gray-800">{country.region || 'N/A'}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Subregion</p>
                  <p className="text-lg font-medium text-gray-800">{country.subregion || 'N/A'}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Capital</p>
                  <p className="text-lg font-medium text-gray-800">
                    {country.capital?.join(', ') || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Demographics Card */}
            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white hover:border-green-100">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-green-100 text-green-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Demographics</h2>
              </div>
              
              <div className="space-y-5">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Population</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formattedPopulation || 'N/A'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Languages</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {languages.length > 0 ? languages.map((lang, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
                      >
                        {lang}
                      </span>
                    )) : <p className="text-gray-800">N/A</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white hover:border-purple-100">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Additional Info</h2>
              </div>
              
              <div className="space-y-5">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">Currencies</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currencies.length > 0 ? currencies.map((currency, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
                      >
                        {currency}
                      </span>
                    )) : <p className="text-gray-800">N/A</p>}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">Time Zones</p>
                  <div className="max-h-40 overflow-y-auto mt-2 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {country.timezones && country.timezones.length > 0 ? (
                      <div className="space-y-2">
                        {country.timezones.map((timezone, index) => (
                          <div 
                            key={index} 
                            className="text-sm text-gray-800 py-2 px-3 bg-gray-100/50 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {timezone}
                          </div>
                        ))}
                      </div>
                    ) : <p className="text-gray-800">N/A</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map and other details section */}
          {country.latlng && (
            <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Geographic Coordinates
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-medium mb-2">Latitude / Longitude</p>
                  <p className="text-lg font-mono bg-gray-50 p-3 rounded-lg">
                    {country.latlng[0].toFixed(4)}° N, {country.latlng[1].toFixed(4)}° E
                  </p>
                </div>
                <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    title={`${country.name.common} map`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={`https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=5&output=embed`}
                    className="hover:opacity-90 transition-opacity"
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CountryDetails;