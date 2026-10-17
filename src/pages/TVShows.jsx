import { useEffect, useState } from 'react';
import { Box, Typography, Chip, CircularProgress, Alert } from '@mui/material';
import { fetchTVGenres, fetchTVByGenre, fetchPopularTV } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import DetailsDialog from '../components/DetailsDialog';

export default function TVShows() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchTVGenres().then(setGenres).catch(() => {}); }, []);

  useEffect(() => {
    setLoading(true); setError(null);
    const fetcher = selectedGenre ? fetchTVByGenre(selectedGenre) : fetchPopularTV();
    fetcher.then(setItems).catch(() => setError('Failed to load TV shows.')).finally(() => setLoading(false));
  }, [selectedGenre]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>TV Shows</Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
        <Chip label="All" clickable color={!selectedGenre ? 'primary' : 'default'} onClick={() => setSelectedGenre(null)} />
        {genres.map(g => (
          <Chip key={g.id} label={g.name} clickable color={selectedGenre === g.id ? 'primary' : 'default'} onClick={() => setSelectedGenre(g.id)} />
        ))}
      </Box>
      {loading && <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && items.length === 0 && <Typography color="text.secondary">No TV shows found.</Typography>}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2 }}>
        {items.map(item => <MovieCard key={item.id} item={item} onClick={() => setSelected(item)} />)}
      </Box>
      {selected && <DetailsDialog open={!!selected} onClose={() => setSelected(null)} mediaType="tv" id={selected.id} />}
    </Box>
  );
}