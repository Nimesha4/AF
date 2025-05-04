import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import Header from './Header';
import Footer from './Footer';
import { getFavorites, toggleFavorite, isFavorite } from '../utils/favorites';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [displayMode, setDisplayMode] = useState('globe');
  const [favorites, setFavorites] = useState(getFavorites());

  const navigate = useNavigate();

  const handleToggleFavorite = (country) => {
    const updatedFavorites = toggleFavorite(country);
    setFavorites(updatedFavorites);
  };

  const handleFilter = async (region) => {
    setLoading(true);
    try {
      const res = region === 'All'
        ? await axios.get('https://restcountries.com/v3.1/all')
        : await axios.get(`https://restcountries.com/v3.1/region/${region}`);
      setCountries(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to fetch countries.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchCountries();
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`);
      if (Array.isArray(response.data)) {
        const exactMatches = response.data.filter(country =>
          country.name.common.toLowerCase() === searchTerm.toLowerCase()
        );
        setCountries(exactMatches.length > 0 ? exactMatches : [response.data[0]]);
        setDisplayMode('carousel');
        setError(null);
      } else if (typeof response.data === 'object') {
        setCountries([response.data]);
        setDisplayMode('carousel');
        setError(null);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to find country.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionCodeSearch = async () => {
    if (!regionCode.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${regionCode}`);
      setCountries(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to find country by code.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch countries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const getFlagImage = (country) => {
    return country?.flags?.png || country?.flags?.svg || '/api/placeholder/320/240';
  };

  const handleCountrySelect = (country) => {
    navigate('/components/CountryDetails', { state: { country } });
  };

  const getRegionColor = (region) => {
    switch (region) {
      case 'Africa': return 'from-yellow-500 to-orange-500';
      case 'Americas': return 'from-blue-500 to-indigo-500';
      case 'Asia': return 'from-red-500 to-pink-500';
      case 'Europe': return 'from-green-500 to-teal-500';
      case 'Oceania': return 'from-purple-500 to-fuchsia-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getRegionIcon = (region) => {
    switch (region) {
      case 'Africa': return '🌍';
      case 'Americas': return '🌎';
      case 'Asia': return '🌏';
      case 'Europe': return '🌍';
      case 'Oceania': return '🌏';
      default: return '🌐';
    }
  };

  const globePosition = (index, total) => {
    const radius = 38;
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep;

    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);

    const scale = 0.8 + Math.random() * 0.4;

    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: `translate(-50%, -50%) scale(${scale})`,
      zIndex: Math.floor(Math.random() * 10)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <Header /><br></br>
      <div className="max-w-6xl mx-auto px-6">
        <div className="pt-12 pb-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwYzkuOTQgMCAxOCA4LjA2IDE4IDE4aDEuMkMzNi42NjcgMTggMzYgMTcuMzMzIDM2IDE4ek0yIDJoMnYySDJ6TTQgMGgydjJINHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+')]"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <h1 className="text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Global Explorer
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Discover countries from around the world in an interactive experience
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-200">Search by Name</label>
                <div className="flex shadow-sm rounded-md overflow-hidden max-w-xs">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter country name..."
                    className="w-full p-3 bg-white/10 border border-white/20 text-white placeholder-blue-200/70 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-l-md"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/30 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-200">Search by Region Code</label>
                <div className="flex shadow-sm rounded-md overflow-hidden max-w-xs">
                  <input
                    type="text"
                    value={regionCode}
                    onChange={(e) => setRegionCode(e.target.value)}
                    placeholder="Enter region code..."
                    className="w-full p-3 bg-white/10 border border-white/20 text-white placeholder-blue-200/70 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-l-md"
                  />
                  <button
                    onClick={handleRegionCodeSearch}
                    className="px-4 py-2 bg-purple-500 text-white font-medium hover:bg-purple-600 transition-all duration-200 shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-200">Filter by Region</label>
                <select
                  onChange={(e) => handleFilter(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 text-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                  <option value="All">All Regions</option>
                  <option value="Africa">Africa</option>
                  <option value="Americas">Americas</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-4 grid grid-cols-4 gap-4">
              <button 
                onClick={() => setDisplayMode('globe')}
                className={`p-3 rounded-lg flex items-center justify-center transition-all duration-200 ${displayMode === 'globe' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-blue-200 hover:bg-white/10'}`}
              >
                <span className="mr-2">🌐</span> Globe View
              </button>
              <button 
                onClick={() => setDisplayMode('carousel')}
                className={`p-3 rounded-lg flex items-center justify-center transition-all duration-200 ${displayMode === 'carousel' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-blue-200 hover:bg-white/10'}`}
              >
                <span className="mr-2">🔄</span> Carousel View
              </button>
              <button 
                onClick={() => setDisplayMode('tiles')}
                className={`p-3 rounded-lg flex items-center justify-center transition-all duration-200 ${displayMode === 'tiles' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'text-blue-200 hover:bg-white/10'}`}
              >
                <span className="mr-2">🔲</span> Mosaic View
              </button>
              <button 
                onClick={() => {
                  setCountries(countries.filter(c => isFavorite(c.cca2)));
                  setDisplayMode('tiles');
                }}
                className={`p-3 rounded-lg flex items-center justify-center transition-all duration-200 ${countries.length > 0 && countries.every(c => isFavorite(c.cca2))
                  ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg' 
                  : 'text-blue-200 hover:bg-white/10'}`}
                disabled={favorites.length === 0}
              >
                <span className="mr-2">❤️</span> Favorites
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/30 border-l-4 border-red-500 p-5 my-6 rounded-r-md">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-300 font-medium">{error}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-20">
              <div className="inline-flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-blue-300 mb-4"></div>
                <p className="text-blue-200">Exploring the world...</p>
              </div>
            </div>
          )}
        </div>

        {!loading && countries.length > 0 && (
          <div className="max-w-6xl mx-auto px-6 pb-16">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 text-sm">
                {countries.length} {countries.length === 1 ? 'country' : 'countries'} found
              </span>
            </div>
            
            {displayMode === 'globe' && (
              <div className="relative w-full h-[700px] bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-full border border-white/10 shadow-xl mb-12 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-20">
                  🌐
                </div>
              
                {countries.slice(0, 30).map((country, index) => (
                  country && country.name && (
                    <button
                      key={index}
                      onClick={() => handleCountrySelect(country)}
                      className="absolute bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 shadow-lg hover:scale-110 transition-all duration-300 focus:outline-none w-32 h-32"
                      style={globePosition(index, Math.min(countries.length, 30))}
                    >
                      <div className="h-20 overflow-hidden">
                        <img 
                          src={getFlagImage(country)} 
                          alt={`${country.name.common} flag`} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/api/placeholder/320/240';
                          }}
                        />
                      </div>
                      <div className="p-2 text-center relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(country);
                          }}
                          className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-400"
                        >
                          {isFavorite(country.cca2) ? '❤️' : '🤍'}
                        </button>
                        <h3 className="text-xs font-bold text-white truncate">{country.name.common}</h3>
                        <p className="text-xs text-blue-200">{getRegionIcon(country.region)}</p>
                      </div>
                    </button>
                  )
                ))}
              </div>
            )}
            
            {displayMode === 'carousel' && (
              <div className="relative overflow-hidden py-16">
                {countries.length === 1 ? (
                  <div className="max-w-3xl mx-auto">
                    <button
                      onClick={() => handleCountrySelect(countries[0])}
                      className="w-full bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-white/50 shadow-xl transition-all duration-300 focus:outline-none transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 h-64 overflow-hidden relative">
                          <div className={`absolute inset-0 bg-gradient-to-r ${getRegionColor(countries[0].region)} opacity-60`}></div>
                          <img 
                            src={getFlagImage(countries[0])} 
                            alt={`${countries[0].name.common} flag`} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/api/placeholder/320/240';
                            }}
                          />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(countries[0]);
                            }}
                            className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-xl"
                          >
                            {isFavorite(countries[0].cca2) ? '❤️' : '🤍'}
                          </button>
                        </div>
                        
                        <div className="md:w-1/2 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="font-bold text-3xl text-white">{countries[0].name.common}</h3>
                            <span className="text-3xl">{getRegionIcon(countries[0].region)}</span>
                          </div>
                          
                          <div className="space-y-4">
                            <p className="text-blue-200 font-medium">{countries[0].region || 'Unknown Region'}</p>
                            
                            {countries[0].capital && (
                              <div className="flex items-center text-white/80">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Capital: {countries[0].capital[0]}
                              </div>
                            )}
                            
                            {countries[0].population && (
                              <div className="flex items-center text-white/80">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Population: {countries[0].population?.toLocaleString()}
                              </div>
                            )}
                            
                            <div className="pt-4 mt-4 border-t border-white/10">
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-blue-200 text-sm">
                                Click for more details
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-6 overflow-x-auto snap-x snap-mandatory pb-6 px-6 -mx-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {countries.map((country, index) => (
                      country && country.name && (
                        <div 
                          key={index}
                          className="flex-none w-80 snap-center"
                        >
                          <button
                            onClick={() => handleCountrySelect(country)}
                            className="w-full bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none transform hover:-translate-y-2"
                          >
                            <div className="h-44 overflow-hidden relative">
                              <div className={`absolute inset-0 bg-gradient-to-r ${getRegionColor(country.region)} opacity-60`}></div>
                              <img 
                                src={getFlagImage(country)} 
                                alt={`${country.name.common} flag`} 
                                className="w-full h-full object-cover mix-blend-overlay"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/api/placeholder/320/240';
                                }}
                              />
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleFavorite(country);
                                }}
                                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-xl"
                              >
                                {isFavorite(country.cca2) ? '❤️' : '🤍'}
                              </button>
                            </div>
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <h3 className="font-bold text-2xl text-white">{country.name.common}</h3>
                                <span className="text-2xl">{getRegionIcon(country.region)}</span>
                              </div>
                              <p className="text-blue-200 text-sm mb-3">{country.region || 'Unknown Region'}</p>
                              {country.capital && (
                                <div className="flex items-center text-xs text-white/70">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  Capital: {country.capital[0]}
                                </div>
                              )}
                            </div>
                          </button>
                        </div>
                      )
                    ))}
                  </div>
                )}
                
                {countries.length > 1 && (
                  <>
                    <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white/50 text-4xl pointer-events-none">
                      ‹
                    </div>
                    <div className="absolute top-1/2 right-6 transform -translate-y-1/2 text-white/50 text-4xl pointer-events-none">
                      ›
                    </div>
                  </>
                )}
              </div>
            )}
            
            {displayMode === 'tiles' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {countries.map((country, index) => (
                  country && country.name && (
                    <button
                      key={index}
                      onClick={() => handleCountrySelect(country)}
                      className="group aspect-square overflow-hidden relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 focus:outline-none border border-white/10 hover:border-white/30"
                    >
                      <div className="absolute inset-0">
                        <img 
                          src={getFlagImage(country)} 
                          alt={`${country.name.common} flag`} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/api/placeholder/320/240';
                          }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(country);
                        }}
                        className="absolute top-2 right-2 p-1 text-xl z-10"
                      >
                        {isFavorite(country.cca2) ? '❤️' : '🤍'}
                      </button>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-3">
                        <h3 className="font-bold text-white text-sm truncate">{country.name.common}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-white/70">{country.region}</span>
                          <span className="text-lg">{getRegionIcon(country.region)}</span>
                        </div>
                      </div>
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        )}
        
        {!loading && countries.length === 0 && (
          <div className="max-w-xl mx-auto text-center py-16 px-6">
            <div className="inline-block text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No countries found</h3>
            <p className="text-blue-200">Try adjusting your search criteria or explore a different region</p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Countries;