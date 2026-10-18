import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#f5c518' },
    background: { default: '#0f0f0f', paper: '#1a1a1a' },
    text: { primary: '#ffffff', secondary: '#b3b3b3' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': { 
  transform: 'translateY(-8px) scale(1.02)', 
  boxShadow: '0 12px 30px rgba(245, 197, 24, 0.2)',
  zIndex: 10
},
        },
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { backgroundColor: '#0f0f0f', boxShadow: 'none' } },
    },
  },
});