import { Box, Typography } from '@mui/material';
import MovieCard from './MovieCard';

export default function MovieRow({ title, items, onSelect }) {
  if (!items?.length) return null;
  return (
    <Box mb={4}>
      <Typography variant="h5" sx={{ mb: 2, px: { xs: 2, md: 0 } }}>{title}</Typography>
      <Box sx={{ 
  display: 'flex', gap: 2, overflowX: 'auto', px: { xs: 2, md: 0 }, pb: 2, 
  scrollbarWidth: 'thin', 
  '&::-webkit-scrollbar': { height: 8 }, 
  '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
  '&::-webkit-scrollbar-thumb': { bgcolor: 'primary.main', borderRadius: 4, '&:hover': { bgcolor: '#fff' } } 
}}>
        {items.map(item => (
          <Box key={item.id} sx={{ minWidth: { xs: 140, sm: 160, md: 180 } }}>
            <MovieCard item={item} onClick={() => onSelect(item)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}