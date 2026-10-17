import { Box, Typography } from '@mui/material';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import DetailsDialog from '../components/DetailsDialog';
import { useState } from 'react';

export default function Watchlist() {
  const { watchlist } = useWatchlist();
  const [selected, setSelected] = useState(null);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>My Watchlist</Typography>
      {watchlist.length === 0 ? (
        <Typography color="text.secondary" py={4}>Your watchlist is empty. Click the + icon on any movie or TV show to save it.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2 }}>
          {watchlist.map(item => <MovieCard key={`${item.media_type}-${item.id}`} item={item} onClick={() => setSelected(item)} />)}
        </Box>
      )}
      {selected && <DetailsDialog open={!!selected} onClose={() => setSelected(null)} mediaType={selected.media_type || (selected.first_air_date ? 'tv' : 'movie')} id={selected.id} />}
    </Box>
  );
}