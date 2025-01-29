import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Container, CssBaseline, ThemeProvider, createTheme, Dialog, DialogTitle, DialogContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchBar from './components/SearchBar';
import WineList from './components/WineList';
import Statistics from './components/Statistics';

function App() {
  const [mode, setMode] = useState('light');
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openStats, setOpenStats] = useState(false);
  const [openVeganProducers, setOpenVeganProducers] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Inter',
        'sans-serif'
      ].join(','),
      h3: {
        fontWeight: 600,
        letterSpacing: '-0.02em',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.02em',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      }
    },
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#800020' : '#9a1750',
      },
      background: {
        default: mode === 'light' 
          ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
          : 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
        paper: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(18, 18, 18, 0.7)',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: mode === 'light'
              ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
              : 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
            minHeight: '100vh',
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 20,
            border: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
            boxShadow: mode === 'light' 
              ? '0 8px 32px rgba(0, 0, 0, 0.1)'
              : '0 8px 32px rgba(0, 0, 0, 0.3)',
            background: mode === 'light'
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 100%)'
              : 'linear-gradient(135deg, rgba(18, 18, 18, 0.7) 0%, rgba(18, 18, 18, 0.3) 100%)',
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
            border: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
            '&:hover': {
              backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
              transform: 'scale(1.01)',
              boxShadow: mode === 'light' 
                ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                : '0 4px 12px rgba(0, 0, 0, 0.3)',
            },
            transition: 'all 0.2s ease-in-out'
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              fontWeight: 600,
              letterSpacing: '-0.01em',
              backgroundColor: mode === 'light' ? 'rgba(128, 0, 32, 0.05)' : 'rgba(154, 23, 80, 0.05)',
              borderBottom: `2px solid ${mode === 'light' ? 'rgba(128, 0, 32, 0.1)' : 'rgba(154, 23, 80, 0.1)'}`,
            }
          }
        }
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            '& .MuiTableRow-root': {
              '&:hover': {
                backgroundColor: mode === 'light' ? 'rgba(128, 0, 32, 0.03)' : 'rgba(154, 23, 80, 0.03)',
                transform: 'scale(1.001)',
                transition: 'all 0.2s ease-in-out'
              }
            }
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(18, 18, 18, 0.9)',
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            letterSpacing: '-0.02em',
            fontSize: '1.5rem'
          }
        }
      }
    }
  });

  const pageStyle = {
    minHeight: '100vh',
    background: mode === 'light'
      ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      : 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
    transition: 'all 0.3s ease'
  };

  const normalizeName = (name) => {
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[''`]/g, "'").toLowerCase();
  };

  // Caricamento dati CSV
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/barnivore_new.csv`);
        const csvText = await response.text();
        console.log("CSV content length:", csvText.length);
        
        Papa.parse(csvText, {
          header: true,
          delimiter: ",",
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Parsing complete", results);
            console.log("First row:", results.data[0]);
            const validData = results.data.filter(wine => 
              wine.name && wine.producer && wine.origin && wine.label
            );
            console.log("Valid rows:", validData.length);
            setWines(validData);
            setFilteredWines(validData);
          },
          error: (error) => {
            console.error("Parsing error:", error);
          }
        });
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    loadCSV();
  }, []);

  const getVeganProducers = () => {
    const producersMap = {};

    wines.forEach(wine => {
      if (!producersMap[wine.producer]) {
        producersMap[wine.producer] = {
          allVegan: true,
          wines: [],
          country: wine.origin
        };
      }

      producersMap[wine.producer].wines.push(wine);
      const isVegan = !wine.label.toLowerCase().includes('not vegan') && 
                     wine.label.toLowerCase().includes('vegan friendly');
      if (!isVegan) {
        producersMap[wine.producer].allVegan = false;
      }
    });

    const veganProducers = Object.entries(producersMap)
      .filter(([_, info]) => info.allVegan && info.wines.length >= 2)
      .map(([producer, info]) => ({
        producer_name: producer,
        country: info.country,
        wines_count: info.wines.length
      }))
      .sort((a, b) => normalizeName(a.producer_name).localeCompare(normalizeName(b.producer_name)));

    return veganProducers;
  };

  const getGlobalStats = () => {
    const countryStats = wines.reduce((acc, wine) => {
      const isVegan = !wine.label.toLowerCase().includes('not vegan') && 
                     wine.label.toLowerCase().includes('vegan friendly');
      
      if (!acc[wine.origin]) {
        acc[wine.origin] = { total: 0, vegan: 0 };
      }
      
      acc[wine.origin].total += 1;
      if (isVegan) acc[wine.origin].vegan += 1;
      
      return acc;
    }, {});

    return Object.entries(countryStats)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([country, stats]) => ({
        country,
        total: stats.total,
        vegan: stats.vegan,
        percentage: ((stats.vegan / stats.total) * 100).toFixed(1)
      }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={pageStyle}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton 
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} 
              color="inherit"
              sx={{
                backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
                '&:hover': {
                  backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
                  transform: 'scale(1.01)',
                  boxShadow: mode === 'light' 
                    ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                    : '0 4px 12px rgba(0, 0, 0, 0.3)',
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>
          <SearchBar 
            wines={wines} 
            setFilteredWines={setFilteredWines}
            setPage={setPage}
          />
          <Statistics 
            wines={filteredWines}
            onShowGlobalStats={() => setOpenStats(true)}
            onShowVeganProducers={() => setOpenVeganProducers(true)}
          />
          <WineList 
            wines={filteredWines}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />

          <Dialog 
            open={openStats} 
            onClose={() => setOpenStats(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle sx={{ pb: 3 }}>Statistiche globali vini vegani</DialogTitle>
            <DialogContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nazione</TableCell>
                      <TableCell align="right">Totale vini</TableCell>
                      <TableCell align="right">Vini vegani</TableCell>
                      <TableCell align="right">Percentuale</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getGlobalStats().map(stat => (
                      <TableRow key={stat.country}>
                        <TableCell>{stat.country}</TableCell>
                        <TableCell align="right">{stat.total}</TableCell>
                        <TableCell align="right">{stat.vegan}</TableCell>
                        <TableCell align="right">{stat.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </Dialog>

          <Dialog 
            open={openVeganProducers} 
            onClose={() => setOpenVeganProducers(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle sx={{ pb: 3 }}>Produttori che producono solo vini vegani</DialogTitle>
            <DialogContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Produttore</TableCell>
                      <TableCell>Nazione</TableCell>
                      <TableCell align="right">Numero vini</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getVeganProducers().map((producer) => (
                      <TableRow key={producer.producer_name}>
                        <TableCell>{producer.producer_name}</TableCell>
                        <TableCell>{producer.country}</TableCell>
                        <TableCell align="right">{producer.wines_count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
