import { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { fetchTrending, fetchPopularMovies, fetchPopularTV, fetchTopRatedMovies } from '../api/tmdb';
import MovieRow from '../components/MovieRow';
import DetailsDialog from '../components/DetailsDialog';

export default function Home() {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchTrending('week'),
      fetchPopularMovies(),
      fetchTopRatedMovies(),
      fetchPopularTV(),
    ])
      .then(([trending, popularMovies, topRated, popularTV]) => {
        setSections({ trending, popularMovies, topRated, popularTV });
      })
      .catch(() => setError('Failed to load content. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <MovieRow title="🔥 Trending This Week" items={sections.trending} onSelect={setSelected} />
      <MovieRow title="🎬 Popular Movies" items={sections.popularMovies} onSelect={setSelected} />
      <MovieRow title="⭐ Top Rated Movies" items={sections.topRated} onSelect={setSelected} />
      <MovieRow title="📺 Popular TV Shows" items={sections.popularTV} onSelect={setSelected} />

      {selected && (
        <DetailsDialog
          open={!!selected}
          onClose={() => setSelected(null)}
          mediaType={selected.media_type || (selected.first_air_date ? 'tv' : 'movie')}
          id={selected.id}
        />
      )}
    </Box>
  );
}