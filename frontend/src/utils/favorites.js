export const getFavorites = () => {
    const saved = localStorage.getItem('countryFavorites');
    return saved ? JSON.parse(saved) : [];
  };
  
  export const saveFavorites = (favorites) => {
    localStorage.setItem('countryFavorites', JSON.stringify(favorites));
  };
  
  export const toggleFavorite = (country) => {
    const favorites = getFavorites();
    const exists = favorites.some(fav => fav.cca2 === country.cca2);
    
    const newFavorites = exists
      ? favorites.filter(fav => fav.cca2 !== country.cca2)
      : [...favorites, country];
    
    saveFavorites(newFavorites);
    return newFavorites;
  };
  
  export const isFavorite = (countryCode) => {
    return getFavorites().some(fav => fav.cca2 === countryCode);
  };