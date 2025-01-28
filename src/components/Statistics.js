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
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(18, 18, 18, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
    boxShadow: theme.palette.mode === 'light' 
      ? '0 4px 30px rgba(0, 0, 0, 0.1)'
      : '0 4px 30px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease'
  };

  const statBoxStyle = {
    p: 3,
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(18, 18, 18, 0.6)',
    borderRadius: 2,
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.palette.mode === 'light' 
        ? '0 6px 35px rgba(0, 0, 0, 0.1)'
        : '0 6px 35px rgba(0, 0, 0, 0.3)',
    }
  };

  const buttonStyle = {
    height: '100%',
    minHeight: 100,
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(18, 18, 18, 0.6)',
    borderRadius: 2,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(18, 18, 18, 0.8)',
      transform: 'translateY(-2px)',
      boxShadow: theme.palette.mode === 'light' 
        ? '0 6px 35px rgba(0, 0, 0, 0.1)'
        : '0 6px 35px rgba(0, 0, 0, 0.3)',
    }
  };

  return (
    <Paper sx={{ ...glassStyle, p: 3, mb: 3 }}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={3}>
          <Box sx={statBoxStyle}>
            <Typography variant="h6" gutterBottom color="primary">
              Totale vini
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {totalWines}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={statBoxStyle}>
            <Typography variant="h6" gutterBottom color="primary">
              Vini vegani
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {veganWines}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ({((veganWines/totalWines)*100).toFixed(1)}%)
            </Typography>
          </Box>
        </Grid>
        {currentCountry && (
          <Grid item xs={12} md={2}>
            <Box sx={statBoxStyle}>
              <Typography variant="h6" gutterBottom color="primary">
                Nazione
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {currentCountry}
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12} md={2}>
          <Button 
            variant="outlined" 
            onClick={onShowGlobalStats}
            fullWidth
            sx={buttonStyle}
          >
            Statistiche globali
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button 
            variant="outlined" 
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
