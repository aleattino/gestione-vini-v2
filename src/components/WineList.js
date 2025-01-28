import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

function WineList({ wines, page, setPage, rowsPerPage, setRowsPerPage }) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ 
      borderRadius: 2,
      overflow: 'hidden',
      backdropFilter: 'blur(10px)',
      backgroundColor: theme => theme.palette.mode === 'light' 
        ? 'rgba(255, 255, 255, 0.8)' 
        : 'rgba(18, 18, 18, 0.8)',
      border: theme => `1px solid ${
        theme.palette.mode === 'light' 
          ? 'rgba(255, 255, 255, 0.3)' 
          : 'rgba(255, 255, 255, 0.1)'
      }`,
      boxShadow: theme => theme.palette.mode === 'light' 
        ? '0 4px 30px rgba(0, 0, 0, 0.1)'
        : '0 4px 30px rgba(0, 0, 0, 0.3)',
      '& .MuiTableCell-root': {
        borderColor: 'rgba(114, 47, 55, 0.1)',
      }
    }}>
      <TableContainer>
        <Table>
          <TableHead>
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
                <TableRow key={index} sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme => 
                      theme.palette.mode === 'light'
                        ? 'rgba(114, 47, 55, 0.03)'
                        : 'rgba(255, 138, 128, 0.03)',
                  }
                }}>
                  <TableCell sx={{ fontWeight: 500 }}>{wine.name}</TableCell>
                  <TableCell>{wine.producer}</TableCell>
                  <TableCell>{wine.origin}</TableCell>
                  <TableCell>{wine.label}</TableCell>
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
        sx={{
          borderTop: '1px solid rgba(114, 47, 55, 0.1)',
          backdropFilter: 'blur(10px)',
          backgroundColor: theme => 
            theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.6)'
              : 'rgba(18, 18, 18, 0.6)',
          '& .MuiTablePagination-select': {
            borderRadius: 1
          }
        }}
      />
    </Paper>
  );
}

export default WineList;
