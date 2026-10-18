import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { WatchlistProvider } from './context/WatchlistContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Watchlist from './pages/Watchlist';
import SearchResults from './pages/SearchResults';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WatchlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="movies" element={<Movies />} />
              <Route path="tv" element={<TVShows />} />
              <Route path="watchlist" element={<Watchlist />} />
              <Route path="search" element={<SearchResults />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WatchlistProvider>
    </ThemeProvider>
  );
} 
