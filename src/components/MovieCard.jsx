import { Card, CardMedia, CardContent, Typography, Box, IconButton, Rating } from '@mui/material';
import { Add, Check } from '@mui/icons-material';
import { getImageUrl } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieCard({ item, onClick }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie');
  const title = item.title || item.name || 'Untitled';
  const date = item.release_date || item.first_air_date;
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const poster = getImageUrl(item.poster_path);
  const saved = isInWatchlist(mediaType, item.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    toggleWatchlist({ ...item, media_type: mediaType });
  };

  return (
    <Card sx={{ width: '100%', cursor: 'pointer', position: 'relative', borderRadius: 2, overflow: 'hidden' }} onClick={onClick}>
      {poster ? (
        <CardMedia component="img" image={poster} alt={title} sx={{ aspectRatio: '2/3', objectFit: 'cover' }} />
      ) : (
        <Box sx={{ aspectRatio: '2/3', bgcolor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">No Poster</Typography>
        </Box>
      )}
      <IconButton size="small" onClick={handleAdd} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.7)', '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' } }}>
        {saved ? <Check fontSize="small" color="primary" /> : <Add fontSize="small" />}
      </IconButton>
      <CardContent sx={{ p: 1.5 }}>
        <Typography variant="subtitle2" noWrap fontWeight={600}>{title}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
          <Typography variant="caption" color="text.secondary">{year}</Typography>
          {item.vote_average > 0 && (
            <Box display="flex" alignItems="center" gap={0.3}>
              <Rating value={item.vote_average / 2} precision={0.5} size="small" readOnly />
              <Typography variant="caption" color="text.secondary">{item.vote_average?.toFixed(1)}</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}