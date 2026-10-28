import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();
const STORAGE_KEY = 'moviebox_watchlist';

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const isInWatchlist = (mediaType, id) => watchlist.some(item => item.media_type === mediaType && item.id === id);
  const addToWatchlist = (item) => { if (!isInWatchlist(item.media_type, item.id)) setWatchlist(prev => [...prev, item]); };
  const removeFromWatchlist = (mediaType, id) => { setWatchlist(prev => prev.filter(item => !(item.media_type === mediaType && item.id === id))); };
  const toggleWatchlist = (item) => {
    if (isInWatchlist(item.media_type, item.id)) removeFromWatchlist(item.media_type, item.id);
    else addToWatchlist(item);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext); 
