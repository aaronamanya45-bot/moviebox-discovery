import { Box, Typography, Button } from '@mui/material';
import { MovieFilter } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import DetailsDialog from '../components/DetailsDialog';
import { useState } from 'react';

export default function Watchlist() {
  const { watchlist } = useWatchlist();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>My Watchlist</Typography>
      
      {watchlist.length === 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={10} textAlign="center">
          <MovieFilter sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
          <Typography variant="h5" gutterBottom fontWeight={600}>Your Watchlist is Empty</Typography>
          <Typography color="text.secondary" mb={4}>Looks like you haven't added any movies or TV shows yet.</Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/')}>
            Discover Movies
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2 }}>
          {watchlist.map(item => <MovieCard key={`${item.media_type}-${item.id}`} item={item} onClick={() => setSelected(item)} />)}
        </Box>
      )}
      
      {selected && <DetailsDialog open={!!selected} onClose={() => setSelected(null)} mediaType={selected.media_type || (selected.first_air_date ? 'tv' : 'movie')} id={selected.id} />}
    </Box>
  );
}