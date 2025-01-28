import React, { useState } from 'react';
import { Paper, TextField, Checkbox, FormControlLabel, Grid, MenuItem, Select, FormControl, InputLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, useTheme } from '@mui/material';

function SearchBar({ wines, setFilteredWines, setPage }) {
 const theme = useTheme();
 const [search, setSearch] = useState('');
 const [onlyVegan, setOnlyVegan] = useState(false);
 const [searchType, setSearchType] = useState('all');
 const [selectedCountry, setSelectedCountry] = useState('');
 const [openAdvanced, setOpenAdvanced] = useState(false);
 const [advancedFilters, setAdvancedFilters] = useState({
   name: '',
   producer: '',
   country: '',
   vegan: false
 });

 const countries = [...new Set(wines.map(wine => wine.origin))].sort();

 const isVegan = (label) => {
   const labelLower = label.toLowerCase();
   return !labelLower.includes('not vegan') && labelLower.includes('vegan friendly');
 };

 const handleFilter = (searchStr = search, vegan = onlyVegan, type = searchType, country = selectedCountry) => {
   let filtered = wines;

   if (searchStr) {
     switch(type) {
       case 'name':
         filtered = filtered.filter(wine => wine.name.toLowerCase().includes(searchStr.toLowerCase()));
         break;
       case 'producer':
         filtered = filtered.filter(wine => wine.producer.toLowerCase().includes(searchStr.toLowerCase()));
         break;
       case 'all':
       default:
         filtered = filtered.filter(wine => 
           wine.name.toLowerCase().includes(searchStr.toLowerCase()) ||
           wine.producer.toLowerCase().includes(searchStr.toLowerCase())
         );
         break;
     }
   }

   if (country) {
     filtered = filtered.filter(wine => wine.origin === country);
   }

   if (vegan) {
     filtered = filtered.filter(wine => isVegan(wine.label));
   }

   setFilteredWines(filtered);
   setPage(0);
 };

 const handleAdvancedSearch = () => {
   let filtered = wines;
   
   if (advancedFilters.name) {
     filtered = filtered.filter(wine => 
       wine.name.toLowerCase().includes(advancedFilters.name.toLowerCase())
     );
   }
   
   if (advancedFilters.producer) {
     filtered = filtered.filter(wine => 
       wine.producer.toLowerCase().includes(advancedFilters.producer.toLowerCase())
     );
   }
   
   if (advancedFilters.country) {
     filtered = filtered.filter(wine => wine.origin === advancedFilters.country);
   }
   
   if (advancedFilters.vegan) {
     filtered = filtered.filter(wine => isVegan(wine.label));
   }
   
   setFilteredWines(filtered);
   setPage(0);
   setOpenAdvanced(false);
 };

 const glassStyle = {
   backgroundColor: theme.palette.mode === 'light' 
     ? 'rgba(255, 255, 255, 0.7)'
     : 'rgba(18, 18, 18, 0.7)',
   backdropFilter: 'blur(16px)',
   WebkitBackdropFilter: 'blur(16px)',
   borderRadius: '20px',
   border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
   boxShadow: theme.palette.mode === 'light' 
     ? '0 8px 32px rgba(0, 0, 0, 0.1)'
     : '0 8px 32px rgba(0, 0, 0, 0.3)',
   transition: 'all 0.2s ease-in-out'
 };

 const inputStyle = {
   '& .MuiOutlinedInput-root': {
     backgroundColor: theme.palette.mode === 'light' 
       ? 'rgba(255, 255, 255, 0.7)'
       : 'rgba(255, 255, 255, 0.05)',
     backdropFilter: 'blur(16px)',
     WebkitBackdropFilter: 'blur(16px)',
     borderRadius: '12px',
     transition: 'all 0.2s ease-in-out',
     '& fieldset': {
       borderColor: theme.palette.mode === 'light' 
         ? 'rgba(0, 0, 0, 0.1)'
         : 'rgba(255, 255, 255, 0.1)',
       transition: 'all 0.2s ease-in-out'
     },
     '&:hover': {
       backgroundColor: theme.palette.mode === 'light' 
         ? 'rgba(255, 255, 255, 0.8)'
         : 'rgba(255, 255, 255, 0.1)',
       transform: 'scale(1.01)',
       '& fieldset': {
         borderColor: theme.palette.mode === 'light' 
           ? 'rgba(0, 0, 0, 0.2)'
           : 'rgba(255, 255, 255, 0.2)'
       }
     },
     '&.Mui-focused': {
       backgroundColor: theme.palette.mode === 'light' 
         ? 'rgba(255, 255, 255, 0.9)'
         : 'rgba(255, 255, 255, 0.15)',
       transform: 'scale(1.01)',
       boxShadow: theme.palette.mode === 'light' 
         ? '0 4px 12px rgba(0, 0, 0, 0.1)'
         : '0 4px 12px rgba(0, 0, 0, 0.3)',
       '& fieldset': {
         borderColor: theme.palette.primary.main,
         borderWidth: '2px'
       }
     }
   },
   '& .MuiInputLabel-root': {
     color: theme.palette.mode === 'light' 
       ? 'rgba(0, 0, 0, 0.7)'
       : 'rgba(255, 255, 255, 0.7)',
     fontWeight: 500
   },
   '& .MuiInputBase-input': {
     fontWeight: 500
   }
 };

 const buttonStyle = {
   height: '45px',
   backgroundColor: theme.palette.mode === 'light' 
     ? 'rgba(0, 0, 0, 0.05)'
     : 'rgba(255, 255, 255, 0.05)',
   backdropFilter: 'blur(16px)',
   WebkitBackdropFilter: 'blur(16px)',
   border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
   borderRadius: '12px',
   color: theme.palette.text.primary,
   fontWeight: 600,
   letterSpacing: '-0.01em',
   transition: 'all 0.2s ease-in-out',
   '&:hover': {
     backgroundColor: theme.palette.mode === 'light' 
       ? 'rgba(0, 0, 0, 0.1)'
       : 'rgba(255, 255, 255, 0.1)',
     transform: 'scale(1.01)',
     boxShadow: theme.palette.mode === 'light' 
       ? '0 4px 12px rgba(0, 0, 0, 0.1)'
       : '0 4px 12px rgba(0, 0, 0, 0.3)'
   }
 };

 return (
   <>
     <Paper sx={{ ...glassStyle, p: 3, mb: 3 }}>
       <Grid container spacing={3} alignItems="center">
         <Grid item xs={12} md={3}>
           <TextField
             fullWidth
             label="Cerca"
             value={search}
             onChange={(e) => {
               setSearch(e.target.value);
               handleFilter(e.target.value);
             }}
             sx={inputStyle}
           />
         </Grid>
         <Grid item xs={12} md={2}>
           <FormControl fullWidth>
             <InputLabel>Cerca per</InputLabel>
             <Select
               value={searchType}
               label="Cerca per"
               onChange={(e) => {
                 setSearchType(e.target.value);
                 handleFilter(search, onlyVegan, e.target.value);
               }}
               sx={inputStyle}
             >
               <MenuItem value="all">Tutti i campi</MenuItem>
               <MenuItem value="name">Nome</MenuItem>
               <MenuItem value="producer">Produttore</MenuItem>
             </Select>
           </FormControl>
         </Grid>
         <Grid item xs={12} md={3}>
           <FormControl fullWidth>
             <InputLabel>Nazione</InputLabel>
             <Select
               value={selectedCountry}
               label="Nazione"
               onChange={(e) => {
                 setSelectedCountry(e.target.value);
                 handleFilter(search, onlyVegan, searchType, e.target.value);
               }}
               sx={inputStyle}
             >
               <MenuItem value="">Tutte</MenuItem>
               {countries.map(country => (
                 <MenuItem key={country} value={country}>{country}</MenuItem>
               ))}
             </Select>
           </FormControl>
         </Grid>
         <Grid item xs={12} md={2}>
           <FormControlLabel
             control={
               <Checkbox
                 checked={onlyVegan}
                 onChange={(e) => {
                   setOnlyVegan(e.target.checked);
                   handleFilter(search, e.target.checked);
                 }}
                 sx={{
                   color: theme.palette.mode === 'light' 
                     ? 'rgba(0, 0, 0, 0.6)'
                     : 'rgba(255, 255, 255, 0.6)',
                   '&.Mui-checked': {
                     color: theme.palette.primary.main
                   },
                   transition: 'all 0.2s ease-in-out'
                 }}
               />
             }
             label="Solo vegani"
             sx={{
               color: theme.palette.text.primary,
               '& .MuiFormControlLabel-label': {
                 fontWeight: 500
               }
             }}
           />
         </Grid>
         <Grid item xs={12} md={2}>
           <Button 
             fullWidth
             onClick={() => setOpenAdvanced(true)}
             sx={buttonStyle}
           >
             Ricerca avanzata
           </Button>
         </Grid>
       </Grid>
     </Paper>

     <Dialog 
       open={openAdvanced} 
       onClose={() => setOpenAdvanced(false)}
       PaperProps={{
         sx: glassStyle
       }}
       maxWidth="sm"
       fullWidth
     >
       <DialogTitle sx={{ 
         fontWeight: 600,
         letterSpacing: '-0.02em',
         color: theme.palette.text.primary
       }}>
         Ricerca avanzata
       </DialogTitle>
       <DialogContent>
         <Grid container spacing={3} sx={{ pt: 1 }}>
           <Grid item xs={12}>
             <TextField
               fullWidth
               label="Nome vino"
               value={advancedFilters.name}
               onChange={(e) => setAdvancedFilters({...advancedFilters, name: e.target.value})}
               sx={inputStyle}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               fullWidth
               label="Produttore"
               value={advancedFilters.producer}
               onChange={(e) => setAdvancedFilters({...advancedFilters, producer: e.target.value})}
               sx={inputStyle}
             />
           </Grid>
           <Grid item xs={12}>
             <FormControl fullWidth>
               <InputLabel>Nazione</InputLabel>
               <Select
                 value={advancedFilters.country}
                 label="Nazione"
                 onChange={(e) => setAdvancedFilters({...advancedFilters, country: e.target.value})}
                 sx={inputStyle}
               >
                 <MenuItem value="">Tutte</MenuItem>
                 {countries.map(country => (
                   <MenuItem key={country} value={country}>{country}</MenuItem>
                 ))}
               </Select>
             </FormControl>
           </Grid>
           <Grid item xs={12}>
             <FormControlLabel
               control={
                 <Checkbox
                   checked={advancedFilters.vegan}
                   onChange={(e) => setAdvancedFilters({...advancedFilters, vegan: e.target.checked})}
                   sx={{
                     color: theme.palette.mode === 'light' 
                       ? 'rgba(0, 0, 0, 0.6)'
                       : 'rgba(255, 255, 255, 0.6)',
                     '&.Mui-checked': {
                       color: theme.palette.primary.main
                     }
                   }}
                 />
               }
               label="Solo vegani"
               sx={{
                 color: theme.palette.text.primary,
                 '& .MuiFormControlLabel-label': {
                   fontWeight: 500
                 }
               }}
             />
           </Grid>
         </Grid>
       </DialogContent>
       <DialogActions sx={{ p: 3 }}>
         <Button 
           onClick={() => setOpenAdvanced(false)}
           sx={buttonStyle}
         >
           Annulla
         </Button>
         <Button 
           onClick={handleAdvancedSearch}
           variant="contained"
           sx={{
             ...buttonStyle,
             backgroundColor: theme.palette.primary.main,
             color: '#fff',
             '&:hover': {
               backgroundColor: theme.palette.primary.dark,
               transform: 'scale(1.01)'
             }
           }}
         >
           Cerca
         </Button>
       </DialogActions>
     </Dialog>
   </>
 );
}

export default SearchBar;
