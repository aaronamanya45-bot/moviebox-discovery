import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, TextField, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import { Menu, Search, Home, Movie, Tv, Bookmark } from '@mui/icons-material';

const DRAWER_WIDTH = 240;
const NAV_ITEMS = [
  { label: 'Home', icon: <Home />, path: '/' },
  { label: 'Movies', icon: <Movie />, path: '/movies' },
  { label: 'TV Shows', icon: <Tv />, path: '/tv' },
  { label: 'My Watchlist', icon: <Bookmark />, path: '/watchlist' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const drawerContent = (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h6" sx={{ px: 2, pb: 2, fontWeight: 800, color: 'primary.main' }}>AARONIX</Typography>
      <List>
        {NAV_ITEMS.map(item => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton selected={location.pathname === item.path} onClick={() => { navigate(item.path); setMobileOpen(false); }} sx={{ mx: 1, borderRadius: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(15, 15, 15, 0.8)' }}>
        <Toolbar>
          {!isDesktop && <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}><Menu /></IconButton>}
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', mr: 3, display: { xs: 'none', sm: 'block' } }}>AARONIX</Typography>
          <Box component="form" onSubmit={handleSearch} sx={{ flex: 1, minWidth: 0, width: '100%', maxWidth: 500 }}>
            <TextField size="small" fullWidth placeholder="Search movies, TV shows..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>, sx: { bgcolor: 'rgba(255,255,255,0.08)', borderRadius: 2, '& fieldset': { border: 'none' } } }} />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}>{drawerContent}</Drawer>
      <Drawer variant="permanent" open sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}>
        <Toolbar />
        {drawerContent}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, mt: 8, ml: { md: `${DRAWER_WIDTH}px` }, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Outlet />
      </Box>
    </Box>
  );
} 
