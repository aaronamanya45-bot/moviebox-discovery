import { Box, Typography } from '@mui/material';
import MovieCard from './MovieCard';

export default function MovieRow({ title, items, onSelect }) {
  if (!items?.length) return null;
  return (
    <Box mb={4}>
      <Typography variant="h5" sx={{ mb: 2, px: { xs: 2, md: 0 } }}>{title}</Typography>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', px: { xs: 2, md: 0 }, pb: 1, scrollbarWidth: 'thin', '&::-webkit-scrollbar': { height: 6 }, '&::-webkit-scrollbar-thumb': { bgcolor: '#444', borderRadius: 3 } }}>
        {items.map(item => (
          <Box key={item.id} sx={{ minWidth: { xs: 140, sm: 160, md: 180 } }}>
            <MovieCard item={item} onClick={() => onSelect(item)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}