import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, useTheme } from '@mui/material';

function WineList({ wines, page, setPage, rowsPerPage, setRowsPerPage }) {
 const theme = useTheme();

 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
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
   overflow: 'hidden',
   transition: 'all 0.2s ease-in-out'
 };

 const tableHeadStyle = {
   '& .MuiTableCell-head': {
     backgroundColor: theme.palette.mode === 'light' 
       ? 'rgba(0, 0, 0, 0.05)'
       : 'rgba(255, 255, 255, 0.05)',
     backdropFilter: 'blur(16px)',
     WebkitBackdropFilter: 'blur(16px)',
     fontWeight: 600,
     letterSpacing: '-0.01em',
     color: theme.palette.text.primary,
     borderBottom: `2px solid ${theme.palette.mode === 'light' 
       ? 'rgba(0, 0, 0, 0.1)'
       : 'rgba(255, 255, 255, 0.1)'}`
   }
 };

 const tableRowStyle = {
   '&:hover': {
     backgroundColor: theme.palette.mode === 'light' 
       ? 'rgba(0, 0, 0, 0.03)'
       : 'rgba(255, 255, 255, 0.03)',
     backdropFilter: 'blur(16px)',
     WebkitBackdropFilter: 'blur(16px)',
     transform: 'scale(1.001)',
     transition: 'all 0.2s ease-in-out'
   },
   '& .MuiTableCell-root': {
     borderBottom: `1px solid ${theme.palette.mode === 'light' 
       ? 'rgba(0, 0, 0, 0.05)'
       : 'rgba(255, 255, 255, 0.05)'}`,
     transition: 'all 0.2s ease-in-out'
   }
 };

 const paginationStyle = {
   backgroundColor: theme.palette.mode === 'light' 
     ? 'rgba(0, 0, 0, 0.02)'
     : 'rgba(255, 255, 255, 0.02)',
   backdropFilter: 'blur(16px)',
   WebkitBackdropFilter: 'blur(16px)',
   borderTop: `1px solid ${theme.palette.mode === 'light' 
     ? 'rgba(0, 0, 0, 0.05)'
     : 'rgba(255, 255, 255, 0.05)'}`,
   '& .MuiTablePagination-select': {
     backgroundColor: theme.palette.mode === 'light' 
       ? 'rgba(0, 0, 0, 0.05)'
       : 'rgba(255, 255, 255, 0.05)',
     borderRadius: '8px',
     padding: '4px 8px',
     border: `1px solid ${theme.palette.mode === 'light' 
       ? 'rgba(0, 0, 0, 0.1)'
       : 'rgba(255, 255, 255, 0.1)'}`,
     transition: 'all 0.2s ease-in-out',
     '&:hover': {
       backgroundColor: theme.palette.mode === 'light' 
         ? 'rgba(0, 0, 0, 0.07)'
         : 'rgba(255, 255, 255, 0.07)',
     }
   },
   '& .MuiTablePagination-selectIcon': {
     color: theme.palette.text.primary,
     transition: 'all 0.2s ease-in-out'
   },
   '& .MuiButtonBase-root': {
     color: theme.palette.text.primary,
     transition: 'all 0.2s ease-in-out',
     '&:hover': {
       backgroundColor: theme.palette.mode === 'light' 
         ? 'rgba(0, 0, 0, 0.07)'
         : 'rgba(255, 255, 255, 0.07)',
     }
   }
 };

 return (
   <Paper sx={glassStyle}>
     <TableContainer>
       <Table>
         <TableHead sx={tableHeadStyle}>
           <TableRow>
             <TableCell>Nome</TableCell>
             <TableCell>Produttore</TableCell>
             <TableCell>Origine</TableCell>
             <TableCell>Etichetta</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {wines
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             .map((wine, index) => (
               <TableRow 
                 key={index} 
                 sx={tableRowStyle}
               >
                 <TableCell sx={{ 
                   fontWeight: 500,
                   color: theme.palette.text.primary
                 }}>
                   {wine.name}
                 </TableCell>
                 <TableCell sx={{ color: theme.palette.text.secondary }}>
                   {wine.producer}
                 </TableCell>
                 <TableCell sx={{ color: theme.palette.text.secondary }}>
                   {wine.origin}
                 </TableCell>
                 <TableCell sx={{ color: theme.palette.text.secondary }}>
                   {wine.label}
                 </TableCell>
               </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     <TablePagination
       rowsPerPageOptions={[10, 25, 50]}
       component="div"
       count={wines.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onPageChange={handleChangePage}
       onRowsPerPageChange={handleChangeRowsPerPage}
       sx={paginationStyle}
     />
   </Paper>
 );
}

export default WineList;
