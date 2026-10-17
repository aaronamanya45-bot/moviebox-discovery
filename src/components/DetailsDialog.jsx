import { Dialog, DialogContent, Box, Typography, Chip, IconButton, Button, Rating, CircularProgress } from '@mui/material';
import { Close, Add, Check } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { fetchDetails, getImageUrl } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

export default function DetailsDialog({ open, onClose, mediaType, id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  useEffect(() => {
    if (!open || !id) return;
    setLoading(true);
    setError(null);
    fetchDetails(mediaType, id).then(setData).catch(() => setError('Failed to load details.')).finally(() => setLoading(false));
  }, [open, mediaType, id]);

  const saved = data && isInWatchlist(mediaType, data.id);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: 0, bgcolor: '#1a1a1a' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10, bgcolor: 'rgba(0,0,0,0.6)' }}>
          <Close />
        </IconButton>
        {loading && <Box p={6} textAlign="center"><CircularProgress /></Box>}
        {error && <Box p={6} textAlign="center"><Typography color="error">{error}</Typography></Box>}
        {data && (
          <Box>
            <Box sx={{ display: 'flex', gap: 3, p: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
              {getImageUrl(data.poster_path) ? (
                <Box component="img" src={getImageUrl(data.poster_path)} alt={data.title || data.name} sx={{ width: { xs: '100%', sm: 200 }, borderRadius: 2, flexShrink: 0 }} />
              ) : (
                <Box sx={{ width: { xs: '100%', sm: 200 }, aspectRatio: '2/3', bgcolor: '#333', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography variant="body2">No Poster</Typography></Box>
              )}
              <Box flex={1}>
                <Typography variant="h5" fontWeight={700}>{data.title || data.name}</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {(data.release_date || data.first_air_date)?.split('-')[0] || 'N/A'} • {mediaType === 'tv' ? 'TV Series' : 'Movie'}
                </Typography>
                {data.vote_average > 0 && (
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Rating value={data.vote_average / 2} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">{data.vote_average.toFixed(1)}/10</Typography>
                  </Box>
                )}
                <Box display="flex" flexWrap="wrap" gap={0.5} mt={2}>
                  {data.genres?.map(g => <Chip key={g.id} label={g.name} size="small" variant="outlined" />)}
                </Box>
                <Button variant={saved ? 'outlined' : 'contained'} startIcon={saved ? <Check /> : <Add />} onClick={() => toggleWatchlist({ ...data, media_type: mediaType })} sx={{ mt: 3 }}>
                  {saved ? 'In Watchlist' : 'Add to Watchlist'}
                </Button>
              </Box>
            </Box>
            <Box px={3} pb={3}>
              <Typography variant="h6" gutterBottom>Overview</Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.7}>{data.overview || 'No overview available.'}</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}