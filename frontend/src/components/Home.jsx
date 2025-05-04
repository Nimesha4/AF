import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './HHeader';
import Footer from '../components/Footer';
import { Globe, Search, Heart, Map, Info } from 'lucide-react';
import img from '../assets/wMap.png';

export default function Home() {
  const [featuredCountries, setFeaturedCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch a few featured countries
    const fetchFeaturedCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        
        // Get random countries for the featured section
        const randomCountries = data
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
          
        setFeaturedCountries(randomCountries);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured countries:', error);
        setLoading(false);
      }
    };

    fetchFeaturedCountries();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src={img}
            alt="World map background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Explore Our World</h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8">Discover fascinating facts about countries, cultures, and regions around the globe</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-colors duration-300 flex items-center justify-center gap-2">
              <Globe size={20} />
              Browse Countries
            </Link>
            <Link to="/login" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-bold transition-colors duration-300 flex items-center justify-center gap-2">
              <Search size={20} />
              Search
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Discover What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Map size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Maps</h3>
              <p className="text-blue-200">Explore countries using our interactive map interface. Zoom, pan, and click to discover more information.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Info size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Detailed Information</h3>
              <p className="text-blue-200">Access comprehensive data about countries including population, languages, currencies, and more.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Save Favorites</h3>
              <p className="text-blue-200">Create your own collection of favorite countries to quickly access the information you care about most.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Countries Section */}
      <div className="py-16 px-6 bg-indigo-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Countries</h2>
          <p className="text-center text-blue-200 mb-12">Explore these highlighted nations from around the world</p>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCountries.map((country) => (
                <Link 
                  to={`/country/${country.cca3}`} 
                  key={country.cca3}
                  className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-48 relative">
                    <img
                      src={country.flags?.png || country.flags?.svg || "/api/placeholder/400/300"}
                      alt={`${country.name.common} flag`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-sm font-light">Click to explore</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{country.name.common}</h3>
                    <p className="text-blue-200">{country.region}</p>
                    {country.capital && (
                      <p className="text-sm text-white/80 mt-1">Capital: {country.capital[0]}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/login" className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-colors duration-300 inline-flex items-center gap-2">
              View All Countries <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="py-20 px-6 text-center bg-gradient-to-r from-purple-800 to-indigo-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore the World?</h2>
          <p className="text-xl text-blue-200 mb-8">Start your journey by discovering incredible facts about countries across all continents.</p>
          <Link to="/login" className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold text-lg transition-colors duration-300 inline-block">
            Begin Your Adventure
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}