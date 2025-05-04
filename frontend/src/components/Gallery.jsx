import React, { useState, useEffect } from 'react';
import { getFavorites } from '../utils/favorites';
import Header from './Header';
import Footer from './Footer';
import { Globe, Heart, MapPin, X, ArrowLeft } from 'lucide-react';

export default function Gallery() {
  const [favorites, setFavorites] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filterRegion, setFilterRegion] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a smoother experience
    setTimeout(() => {
      setFavorites(getFavorites());
      setIsLoading(false);
    }, 600);
  }, []);

  const handleRemoveFavorite = (e, countryCode) => {
    e.stopPropagation();
    const updatedFavorites = getFavorites().filter(fav => fav.cca2 !== countryCode);
    localStorage.setItem('countryFavorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);

    // If removing the currently selected country, close the detail view
    if (selectedCountry && selectedCountry.cca2 === countryCode) {
      setSelectedCountry(null);
    }
  };

  const handleCardClick = (country) => {
    setSelectedCountry(country);
  };

  const closeDetail = () => {
    setSelectedCountry(null);
  };

  const uniqueRegions = ['All', ...new Set(favorites.map(country => country.region))];

  const filteredFavorites = filterRegion === 'All' 
    ? favorites 
    : favorites.filter(country => country.region === filterRegion);

  // Generate a random color based on country name for card accent
  const getCountryColor = (name) => {
    const colors = [
      'from-pink-500 to-rose-500',
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-violet-500',
      'from-amber-500 to-yellow-500',
      'from-emerald-500 to-green-500',
      'from-red-500 to-orange-500'
    ];
    
    // Simple hash function to get consistent color for same country
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-100 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative">
        {selectedCountry ? (
          // Country Detail View
          <div className="animate-fadeIn">
            <button 
              onClick={closeDetail}
              className="flex items-center mb-6 text-blue-300 hover:text-blue-100 transition-colors group"
            >
              <ArrowLeft className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
              Back to gallery
            </button>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img
                  src={selectedCountry.flags?.png || selectedCountry.flags?.svg}
                  alt={`${selectedCountry.name.common} flag`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-4xl md:text-5xl font-bold">{selectedCountry.name.common}</h2>
                  <p className="text-xl text-blue-200 flex items-center mt-2">
                    <Globe size={20} className="mr-2" />
                    {selectedCountry.region}
                    {selectedCountry.subregion && ` • ${selectedCountry.subregion}`}
                  </p>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-200">Country Details</h3>
                  <div className="space-y-4">
                    {selectedCountry.capital && (
                      <div className="flex items-start">
                        <MapPin className="mr-3 mt-1 text-blue-300" size={18} />
                        <div>
                          <p className="font-medium text-lg">Capital</p>
                          <p className="text-white/80">{selectedCountry.capital[0]}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedCountry.languages && (
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 text-blue-300">🗣️</div>
                        <div>
                          <p className="font-medium text-lg">Languages</p>
                          <p className="text-white/80">
                            {Object.values(selectedCountry.languages || {}).join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {selectedCountry.currencies && (
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 text-blue-300">💰</div>
                        <div>
                          <p className="font-medium text-lg">Currency</p>
                          <p className="text-white/80">
                            {Object.values(selectedCountry.currencies || {})
                              .map(currency => `${currency.name} (${currency.symbol})`)
                              .join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {selectedCountry.population && (
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 text-blue-300">👥</div>
                        <div>
                          <p className="font-medium text-lg">Population</p>
                          <p className="text-white/80">
                            {selectedCountry.population.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  {selectedCountry.coatOfArms?.png && (
                    <div className="flex flex-col items-center">
                      <h3 className="text-2xl font-bold mb-4 text-blue-200">Coat of Arms</h3>
                      <div className="bg-white/5 rounded-xl p-6 flex items-center justify-center">
                        <img 
                          src={selectedCountry.coatOfArms.png} 
                          alt={`${selectedCountry.name.common} coat of arms`}
                          className="max-h-48 max-w-full"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <button
                      onClick={(e) => handleRemoveFavorite(e, selectedCountry.cca2)}
                      className="w-full py-3 px-4 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors flex items-center justify-center"
                    >
                      <X size={16} className="mr-2" />
                      Remove from favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Gallery View
          <div>
            <div className="relative z-10">
              <div className="w-full md:w-1/2 lg:w-1/3 mx-auto mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl blur-lg opacity-30"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-1">
                    <select
                      value={filterRegion}
                      onChange={(e) => setFilterRegion(e.target.value)}
                      className="w-full bg-transparent py-3 px-4 rounded-lg text-center appearance-none cursor-pointer focus:outline-none"
                    >
                      {uniqueRegions.map(region => (
                        <option key={region} value={region} className="bg-slate-800 text-white">
                          {region === 'All' ? 'All Regions' : region}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                      <svg className="h-4 w-4 fill-current text-white/70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
          
              <h1 className="text-4xl font-bold mb-2 text-center">Your Favorite Countries</h1>
              <p className="text-center text-blue-300 mb-10">Explore your collection of countries from around the world</p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400"></div>
              </div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="inline-flex justify-center items-center w-24 h-24 bg-indigo-900/40 rounded-full mb-6">
                  <Heart size={40} className="text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-blue-100 mb-2">No favorites yet</h3>
                <p className="text-lg text-blue-300 max-w-md mx-auto">
                  Visit the Countries page to discover and add some favorites to your collection
                </p>
                <a 
                  href="/countries" 
                  className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-indigo-500/30"
                >
                  Explore Countries
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFavorites.map((country, index) => (
                  <div
                    key={country.cca2}
                    onClick={() => handleCardClick(country)}
                    className="group bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-300 cursor-pointer animate-fadeIn"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className="h-48 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${getCountryColor(country.name.common)} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                      <img
                        src={country.flags?.png || country.flags?.svg}
                        alt={`${country.name.common} flag`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <button
                        onClick={(e) => handleRemoveFavorite(e, country.cca2)}
                        className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500/80"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-blue-200 transition-colors">
                        {country.name.common}
                      </h3>
                      <p className="text-blue-300 flex items-center text-sm">
                        <Globe size={14} className="mr-1" />
                        {country.region}
                      </p>
                      {country.capital && (
                        <p className="text-sm text-white/70 mt-2 flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {country.capital[0]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
      
      <Footer />
    </div>
  );
}