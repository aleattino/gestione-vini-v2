import React from 'react';
import { Paper, Typography, Grid, Box, Button, useTheme } from '@mui/material';

function Statistics({ wines, onShowGlobalStats, onShowVeganProducers }) {
  const theme = useTheme();
  const totalWines = wines.length;
  const veganWines = wines.filter(wine => {
    const label = wine.label.toLowerCase();
    return !label.includes('not vegan') && label.includes('vegan friendly');
  }).length;
  
  const uniqueCountries = [...new Set(wines.map(wine => wine.origin))];
  const currentCountry = uniqueCountries.length === 1 ? uniqueCountries[0] : '';

  const glassStyle = {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(18, 18, 18, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
    boxShadow: theme.palette.mode === 'light' 
      ? '0 8px 32px rgba(0, 0, 0, 0.1)'
      : '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease-in-out'
  };

  const statBoxStyle = {
    p: 3,
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      backgroundColor: theme.palette.mode === 'light' 
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(255, 255, 255, 0.1)',
      boxShadow: theme.palette.mode === 'light' 
        ? '0 8px 32px rgba(0, 0, 0, 0.1)'
        : '0 8px 32px rgba(0, 0, 0, 0.3)',
    }
  };

  const buttonStyle = {
    height: '100%',
    minHeight: 120,
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
    borderRadius: '16px',
    color: theme.palette.text.primary,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    fontSize: '1rem',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' 
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-2px)',
      boxShadow: theme.palette.mode === 'light' 
        ? '0 8px 32px rgba(0, 0, 0, 0.1)'
        : '0 8px 32px rgba(0, 0, 0, 0.3)'
    }
  };

  return (
    <Paper sx={{ ...glassStyle, p: 3, mb: 3 }}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={3}>
          <Box sx={statBoxStyle}>
            <Typography 
              variant="h6" 
              gutterBottom 
              color="primary"
              sx={{ 
                fontWeight: 600,
                letterSpacing: '-0.02em',
                opacity: 0.9
              }}
            >
              Totale vini
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '-0.02em',
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(45deg, #1a1a1a 30%, #4a4a4a 90%)'
                  : 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {totalWines}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={statBoxStyle}>
            <Typography 
              variant="h6" 
              gutterBottom 
              color="primary"
              sx={{ 
                fontWeight: 600,
                letterSpacing: '-0.02em',
                opacity: 0.9
              }}
            >
              Vini vegani
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '-0.02em',
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(45deg, #1a1a1a 30%, #4a4a4a 90%)'
                  : 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {veganWines}
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                fontWeight: 500,
                mt: 1,
                opacity: 0.8
              }}
            >
              ({((veganWines/totalWines)*100).toFixed(1)}%)
            </Typography>
          </Box>
        </Grid>
        {currentCountry && (
          <Grid item xs={12} md={2}>
            <Box sx={statBoxStyle}>
              <Typography 
                variant="h6" 
                gutterBottom 
                color="primary"
                sx={{ 
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  opacity: 0.9
                }}
              >
                Nazione
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(45deg, #1a1a1a 30%, #4a4a4a 90%)'
                    : 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {currentCountry}
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12} md={2}>
          <Button 
            variant="text" 
            onClick={onShowGlobalStats}
            fullWidth
            sx={buttonStyle}
          >
            Statistiche globali
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button 
            variant="text" 
            onClick={onShowVeganProducers}
            fullWidth
            sx={buttonStyle}
          >
            Produttori vegani
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Statistics;
