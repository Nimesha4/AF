import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const CountryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state?.country;
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger entrance animation after component mounts
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!country) return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gradient-to-b from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-3xl font-bold text-white p-8 bg-white/10 backdrop-blur rounded-lg shadow-xl animate-pulse border border-white/20">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Country not found
          </div>
          <div className="text-lg font-normal mt-4 text-gray-200">
            Please return to the countries list and try again
          </div>
          <button 
            onClick={() => navigate('/countries')} 
            className="mt-6 bg-white/20 hover:bg-white/40 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Countries
          </button>
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

  // Calculate area in km² and mi²
  const areaInKm = country.area?.toLocaleString();
  const areaInMiles = country.area ? Math.round(country.area * 0.386102).toLocaleString() : null;

  return (
    <div className="country-details-page">
      <Header />
      <div className="cosmic-background min-h-screen text-white">
        <main className="relative">
          {/* Flag header with enhanced parallax effect */}
          <div className="relative h-screen max-h-[700px] w-full overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"
              style={{ 
                opacity: Math.min(1, 0.4 + scrollY * 0.001),
                background: `linear-gradient(to top, 
                rgba(0,0,0,0.9) 0%, 
                rgba(0,0,0,${0.7 - scrollY * 0.0005}) 40%, 
                rgba(0,0,0,${0.4 - scrollY * 0.0005}) 60%, 
                rgba(0,0,0,0) 100%)`
              }}
            ></div>
            
            <img
              src={country.flags?.png || country.flags?.svg}
              alt={`${country.name.common} flag`}
              className="w-full h-full object-cover object-center flag-parallax"
              style={{ 
                transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.2}px)`,
                transformOrigin: 'center',
                filter: `brightness(${1 - scrollY * 0.0008})`
              }}
            />
            
            <div className="absolute bottom-0 left-0 p-8 w-full z-20">
              <div className="max-w-6xl mx-auto" style={{ transform: `translateY(${-scrollY * 0.15}px)` }}>
                <div className={`transition-all duration-1000 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 drop-shadow-lg hero-text">
                    {country.name.common}
                  </h1>
                  <p className="text-xl text-white/80 font-medium tracking-wide official-name">
                    {country.name.official}
                  </p>
                  
                  {/* Quick stats bar */}
                  <div className="flex flex-wrap gap-6 mt-6 quick-stats">
                    {country.region && (
                      <div className="stat-item">
                        <span className="text-sm text-blue-300">Region</span>
                        <span className="text-lg font-medium">{country.region}</span>
                      </div>
                    )}
                    
                    {country.capital && (
                      <div className="stat-item">
                        <span className="text-sm text-blue-300">Capital</span>
                        <span className="text-lg font-medium">{country.capital?.join(', ')}</span>
                      </div>
                    )}
                    
                    {formattedPopulation && (
                      <div className="stat-item">
                        <span className="text-sm text-blue-300">Population</span>
                        <span className="text-lg font-medium">{formattedPopulation}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/countries')} 
              className="absolute top-6 left-6 bg-white/20 hover:bg-white/40 text-white backdrop-blur px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg z-20 flex items-center gap-2 group back-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Countries
            </button>
          </div>

          {/* Main content */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-30 pb-24">
            {/* Stats cards grid with staggered animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Location Card */}
              <div className={`bg-gradient-to-br from-white/90 to-white/80 backdrop-blur p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100/50 card-glow blue-glow ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-blue-600 text-white mr-4 card-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Location</h2>
                </div>
                
                <div className="space-y-5">
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Region</p>
                    <p className="text-lg font-medium text-gray-800">{country.region || 'N/A'}</p>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Subregion</p>
                    <p className="text-lg font-medium text-gray-800">{country.subregion || 'N/A'}</p>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Capital</p>
                    <p className="text-lg font-medium text-gray-800">
                      {country.capital?.join(', ') || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Demographics Card */}
              <div className={`bg-gradient-to-br from-white/90 to-white/80 backdrop-blur p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100/50 card-glow green-glow ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-green-600 text-white mr-4 card-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Demographics</h2>
                </div>
                
                <div className="space-y-5">
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Population</p>
                    <p className="text-2xl font-bold text-green-600 population-count">
                      {formattedPopulation || 'N/A'}
                    </p>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Languages</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {languages.length > 0 ? languages.map((lang, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors language-tag"
                        >
                          {lang}
                        </span>
                      )) : <p className="text-gray-800">N/A</p>}
                    </div>
                  </div>
                  
                  {areaInKm && (
                    <div className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Area</p>
                      <p className="text-lg font-bold text-gray-800">
                        {areaInKm} km² <span className="text-sm font-normal text-gray-500">({areaInMiles} mi²)</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info Card */}
              <div className={`bg-gradient-to-br from-white/90 to-white/80 backdrop-blur p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-100/50 card-glow purple-glow ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-purple-600 text-white mr-4 card-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Additional Info</h2>
                </div>
                
                <div className="space-y-5">
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">Currencies</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currencies.length > 0 ? currencies.map((currency, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors currency-tag"
                        >
                          {currency}
                        </span>
                      )) : <p className="text-gray-800">N/A</p>}
                    </div>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">Time Zones</p>
                    <div className="max-h-40 overflow-y-auto mt-2 pr-2 custom-scrollbar">
                      {country.timezones && country.timezones.length > 0 ? (
                        <div className="space-y-2">
                          {country.timezones.map((timezone, index) => (
                            <div 
                              key={index} 
                              className="text-sm text-gray-800 py-2 px-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors timezone-item"
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

            {/* Interactive Map with enhanced styling */}
            {country.latlng && (
              <div className={`mt-12 bg-gradient-to-br from-white/90 to-white/80 backdrop-blur rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{ transitionDelay: '700ms' }}>
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
                    <p className="text-lg font-mono bg-gray-50 p-3 rounded-lg border border-gray-100">
                      {country.latlng[0].toFixed(4)}° N, {country.latlng[1].toFixed(4)}° E
                    </p>
                    
                    {/* Additional geographic details */}
                    <div className="mt-6 space-y-4">
                      {country.borders && country.borders.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 uppercase font-medium mb-2">Bordering Countries</p>
                          <div className="flex flex-wrap gap-2">
                            {country.borders.map((border, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border-tag">
                                {border}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {country.tld && country.tld.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 uppercase font-medium mb-2">Top-Level Domain</p>
                          <div className="flex flex-wrap gap-2">
                            {country.tld.map((domain, index) => (
                              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                {domain}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="h-80 bg-gray-100 rounded-lg overflow-hidden shadow-inner map-container">
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
            
            {/* Coat of arms section (if available) */}
            {country.coatOfArms?.png && (
              <div className={`mt-12 bg-gradient-to-br from-white/90 to-white/80 backdrop-blur rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{ transitionDelay: '900ms' }}>
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    National Emblem
                  </h3>
                </div>
                <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-48 h-48 flex items-center justify-center emblem-container">
                    <img 
                      src={country.coatOfArms.png} 
                      alt={`${country.name.common} coat of arms`}
                      className="max-w-full max-h-full object-contain emblem-image"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Coat of Arms</h4>
                    <p className="text-gray-600">
                      The coat of arms is a traditional heraldic design that represents the identity and sovereignty of {country.name.common}.
                      These symbolic emblems often contain elements reflecting the nation's history, values, and cultural heritage.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
      <style jsx>{`
    .bg-deep-space {
      background: linear-gradient(to bottom, #16222A 0%, #3A6073 100%);
      position: relative;
    }
    .bg-deep-space::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
        radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
        radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
        radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
      background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
      background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
      animation: stars 120s linear infinite;
    }
    @keyframes stars {
      0% { background-position: 0 0, 40px 60px, 130px 270px, 70px 100px; }
      100% { background-position: 1000px 1000px, 1040px 1060px, 1130px 1270px, 1070px 1100px; }
    }
  `}</style>  
 
      </div>
     
   
     
  );
};

export default CountryDetails;