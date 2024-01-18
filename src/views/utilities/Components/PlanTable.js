import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(Circle, Plan, Data, Validity, Price) {
  return { Circle, Plan, Data, Validity, Price };
}

const rows = [
  createData('Mumbai', 'Recharge', 'N/A', 28, 210),
  createData('Delhi', 'Recharge', 'N/A', 28, 240),
  createData('TamilNadu', 'Recharge', 'N/A', 28, 230),
  createData('Jammu', 'Recharge', 'N/A', 28, 420),
  createData('Kashmir', 'Recharge', 'N/A', 28, 510),
  createData('Mumbai', 'Recharge', 'N/A', 28, 210),
  createData('Delhi', 'Recharge', 'N/A', 28, 240),
  createData('TamilNadu', 'Recharge', 'N/A', 28, 230),
  createData('Jammu', 'Recharge', 'N/A', 28, 420),
  createData('Kashmir', 'Recharge', 'N/A', 28, 510),
  createData('Kashmir', 'Recharge', 'N/A', 28, 510),
  createData('Mumbai', 'Recharge', 'N/A', 28, 210),
  createData('Delhi', 'Recharge', 'N/A', 28, 240),
]

export default function PlanTable() {
  return (
    <TableContainer component={Paper}
    sx={{height:'50vh',overflowY:'scroll'}}>
      <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Circle</TableCell>
            <TableCell align="right">Plan type</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Validity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Circle}
              </TableCell>
              <TableCell align="right">{row.Plan}</TableCell>
              <TableCell align="right">{row.Data}</TableCell>
              <TableCell align="right">{row.Validity}days</TableCell>
              <TableCell align="right">₹ {row.Price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
