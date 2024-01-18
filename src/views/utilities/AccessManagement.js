import React from 'react';
import SubCard from 'ui-component/cards/SubCard';
import { Grid, TextField, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack } from '@mui/system';

const AccessManagement = () => {
  const dataref = React.useRef();

  const [Data, setData] = React.useState({
    Group: '',
    Product: '',
    fields: []
  });

  const [FieldAccess, setFieldAccess] = React.useState({
    Field: '',
    access: ''
  });

  const handleChange = (field, value) => {
    switch (field) {
      case 'group':
        setData({ ...Data, Group: group[value].label });
        break;
      case 'product':
        setData({ ...Data, Product: Product[value].label });
        break;
      case 'field':
        setFieldAccess({ ...FieldAccess, Field: Product[0].field[value] });
        break;
      case 'access':
        setFieldAccess({ ...FieldAccess, access: value });
        break;
      default:
        break;
    }
    console.log(Data, FieldAccess);
  };

  const group = [
    { label: 'DA', year: 1994 },
    { label: 'TM', year: 1972 },
    { label: 'SH', year: 1974 },
    { label: 'AGENT', year: 2008 }
  ];

  const Product = [
    { label: 'SBI CSP', field: ['Name', 'Aadhar', 'Pan', 'Phone'] },
    { label: 'HDFC', field: ['Name', 'Aadhar', 'Pan', 'Phone'] },
    { label: 'AXIS', field: ['Name', 'Aadhar', 'Pan', 'Phone'] },
    { label: 'IOB', field: ['Name', 'Aadhar', 'Pan', 'Phone'] }
  ];

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const [rows, setRows] = React.useState([]);
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  const handleAddField = () => {
    setRows([...rows, createData(Data.Group, Data.Product, FieldAccess.Field, FieldAccess.access)]);
    setData({ ...Data, fields: [...Data.fields, FieldAccess] });
    setFieldAccess({ Field: '', access: '' });
    dataref.current.value = null;
    console.log('add field', Data);
  };

  const handleSubmit = () => {
    console.log(Data);
  };

  return (
    <Grid container xl={12}>
      <Grid item xl={12}>
        <SubCard title="Access Management">
          <Grid container xl={10} spacing={2}>
            <Grid item xl={4} md={6} xs={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={Data.Group}
                options={group}
                renderInput={(params) => <TextField {...params} label="Group" />}
                fullWidth
                onChange={(e) => handleChange('group', e.target.value)}
              />
            </Grid>

            <Grid item xl={4} md={6} xs={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={Data.Product}
                options={Product}
                renderInput={(params) => <TextField {...params} ref={dataref} label="Product" fullWidth />}
                fullWidth
                onChange={(e) => handleChange('product', e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container xl={10} spacing={2} sx={{ mt: 1 }} alignItems="center">
            <Grid item xl={4} md={6} xs={10}>
              <Autocomplete
                disablePortal
                value={FieldAccess.Field}
                id="combo-box-demo"
                options={Product[0].field}
                renderInput={(params) => <TextField value={FieldAccess.Field} {...params} label="Field" />}
                fullWidth
                onChange={(e) => handleChange('field', e.target.value)}
              />
            </Grid>

            <Grid item xl={4} md={6} xs={10}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Access Type</InputLabel>
                <Select
                  value={FieldAccess.access}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Access type"
                  onChange={(e) => handleChange('access', e.target.value)}
                >
                  <MenuItem value={'view'}>View</MenuItem>
                  <MenuItem value={'edit'}>Edit</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xl={2}>
              <Button variant="outlined" color="secondary" onClick={handleAddField}>
                Add access
              </Button>
            </Grid>
          </Grid>

          {/* Table */}

          <TableContainer component={Paper} sx={{ height: 300 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Group</TableCell>
                  <TableCell align="left">Product</TableCell>
                  <TableCell align="left">Field</TableCell>
                  <TableCell align="left">Access Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.calories}</TableCell>
                    <TableCell align="left">{row.fat}</TableCell>
                    <TableCell align="left">{row.carbs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" sx={{ mt: 2, width: '100%' }} justifyContent="flex-end">
            <Button variant="contained" size="small" color="secondary" sx={{ width: 'fit-content' }} onClick={handleSubmit}>
              Provide Access
            </Button>
          </Stack>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default AccessManagement;
