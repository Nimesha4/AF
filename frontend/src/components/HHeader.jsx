import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const announcements = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      text: "New destinations added! Explore our latest travel experiences"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      text: "Limited time offer: Get 15% off on your first booking"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      text: "Summer specials now available"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      text: "Download our new mobile app for exclusive deals"
    }
  ];

  // Create announcement item component
  const AnnouncementItem = ({ icon, text }) => (
    <span className="text-white flex items-center text-sm font-medium mx-4">
      {icon}
      <span>{text}</span>
    </span>
  );

  const [isPaused, setIsPaused] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`relative z-10 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Top decorative bar - colorful wave pattern */}
      <div className="h-2 bg-gradient-to-r from-pink-400 via-yellow-300 to-teal-400"></div>
      
      {/* Main header */}
      <div className={`bg-gradient-to-r from-blue-50 to-pink-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <span className="transform transition-transform duration-300 group-hover:scale-110">TW</span>
                </div>
                <div className="ml-3">
                  <span className="block text-2xl font-extrabold bg-gradient-to-r from-teal-500 to-pink-500 text-transparent bg-clip-text transition-all duration-300 group-hover:tracking-wider">
                    TravelWorld
                  </span>
                  <span className="text-xs text-teal-600 font-light tracking-wider">EXPLORE • DREAM • DISCOVER</span>
                </div>
              </Link>
            </div>
            
            
            
            {/* Authentication buttons */}
            <div className="hidden md:flex items-center">
            <Link to="/login" className="block px-4 py-2 text-base font-medium text-indigo-600 hover:text-indigo-800">
                  Sign In
                </Link>
              <Link to="/register" className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-purple-400 hover:from-teal-500 hover:to-purple-500 rounded-full shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
                <span className="flex items-center">
                  <span>Sign Up</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-teal-600 hover:text-pink-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-teal-300 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-pink-100 absolute w-full shadow-lg rounded-b-2xl overflow-hidden">
            <div className="px-4 pt-3 pb-4 space-y-1">
               
            </div>
            <div className="pt-4 pb-5 border-t border-pink-100 bg-gradient-to-r from-blue-50 to-pink-50">
              <div className="flex items-center justify-center px-5">
              <Link to="/login" className="block px-4 py-2 text-base font-medium text-indigo-600 hover:text-indigo-800">
                  Sign In
                </Link>
                <Link to="/login" className="block w-full px-4 py-3 text-center text-base font-medium text-white bg-gradient-to-r from-teal-400 to-purple-400 hover:from-teal-500 hover:to-purple-500 rounded-full shadow-sm transition-all duration-200">
                  <span className="flex items-center justify-center">
                    <span>Sign Up</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </span>
                </Link>
                 
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Animated notification banner with more style */}
      <div 
  className="bg-gradient-to-r from-teal-400 via-blue-300 to-pink-400 py-2 overflow-hidden relative"
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto relative overflow-hidden">
          {/* First marquee */}
          <div 
            className={`whitespace-nowrap flex items-center ${
              isPaused 
                ? "animate-none" 
                : "animate-marquee"
                
            }`}
            style={{
              animationDuration: '30s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
            }}
          >
            {announcements.map((announcement, index) => (
              <AnnouncementItem 
                key={`announcement-1-${index}`}
                icon={announcement.icon}
                text={announcement.text}
              />
            ))}
            {announcements.map((announcement, index) => (
        <AnnouncementItem 
          key={`announcement-duplicate-${index}`}
          icon={announcement.icon}
          text={announcement.text}
        />
      ))}
          </div>
          
          {/* Duplicate marquee for seamless loop */}
          <div 
            className={`absolute whitespace-nowrap flex items-center ${
              isPaused 
                ? "animate-none" 
                : "animate-marquee2"
            }`}
            style={{
              animationDuration: '30s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
            }}
          >
            {announcements.map((announcement, index) => (
              <AnnouncementItem 
                key={`announcement-2-${index}`}
                icon={announcement.icon}
                text={announcement.text}
              />
            ))}
          </div>
        </div>
      </div>
       
        
        {/* Decorative sparkles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
    <div className="absolute top-1 left-1/4 w-1 h-1 bg-white rounded-full opacity-70 animate-ping" style={{ animationDuration: '3s' }}></div>
    <div className="absolute top-3 left-1/3 w-1 h-1 bg-white rounded-full opacity-70 animate-ping" style={{ animationDuration: '2.3s' }}></div>
    <div className="absolute top-2 left-2/3 w-1 h-1 bg-white rounded-full opacity-70 animate-ping" style={{ animationDuration: '1.8s' }}></div>
    <div className="absolute bottom-1 left-1/5 w-1 h-1 bg-white rounded-full opacity-70 animate-ping" style={{ animationDuration: '2.7s' }}></div>
    <div className="absolute bottom-3 left-3/4 w-1 h-1 bg-white rounded-full opacity-70 animate-ping" style={{ animationDuration: '3.5s' }}></div>
  </div>
      
      </div>
      <style jsx global>{`
      @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
    }
      @keyframes marquee2 {
        0% { transform: translateX(100%); }
        100% { transform: translateX(0); }
      }
     
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
      .animate-marquee2 {
        animation: marquee2 30s linear infinite;
      }
    `}</style>
   
    
    </header>
    
  );
};

export default Header;