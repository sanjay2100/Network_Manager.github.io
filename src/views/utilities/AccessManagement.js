import React, { useEffect, useState } from 'react';
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
import { GetGroups } from 'API/Groups/apis';
import { getApi, getById } from 'API/Products/apis';

const AccessManagement = () => {
  const dataref = React.useRef();

  const [Data, setData] = React.useState({
    fields: []
  });

  const [FieldAccess, setFieldAccess] = React.useState({});

  const [display_name, setDisplayName] = useState({});

  const [ProductField, setProductField] = useState(null);

  const handleChange = (field, value) => {
    console.log(value);
    switch (field) {
      case 'group':
        setData({ ...Data, group: value._id });
        setDisplayName({ ...display_name, group: value.name });
        break;
      case 'product': 
        setData({ ...Data, Product:   value._id });
        setDisplayName({ ...display_name, Product: value.display_name });
        console.log("changeproduct ",value);
        getGroupFields(value._id);
        break;
      case 'field':
        setFieldAccess({ ...FieldAccess, Field: value.field_id });
        setDisplayName({ ...display_name, Field: value.field_name });
        break;
      case 'access':
        setFieldAccess({ ...FieldAccess, access: value });
        setDisplayName({ ...display_name, access: value });
        break;
      default:
        break;
    }
  };
  console.log(display_name);

  const [group, setGroup] = useState(null);
  const [Product, setProduct] = useState(null);

  const getGroup = () => {
    GetGroups(setGroup);
    getApi(setProduct);
  };

  const getGroupFields = (id) => {
    getById(id, setProductField);
  };
  console.log('product field', ProductField);
  console.log(Product);
  console.log(group);

  useEffect(() => {
    getGroup();
  }, []);
  // const group = [
  //   { label: 'DA', year: 1994 },
  //   { label: 'TM', year: 1972 },
  //   { label: 'SH', year: 1974 },
  //   { label: 'AGENT', year: 2008 }
  // ];

  // const Product = [
  //   { label: 'SBI CSP', field: ['Name', 'Aadhar', 'Pan', 'Phone'] },
  //   { label: 'HDFC', field: ['Name', 'Aadhar', 'Pan', 'Phone'] },
  //   { label: 'AXIS', field: ['Name', 'Aadhar', 'Pan', 'Phone'] },
  //   { label: 'IOB', field: ['Name', 'Aadhar', 'Pan', 'Phone'] }
  // ];

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
    setRows([...rows, createData(display_name.group, display_name.Product, display_name.Field, display_name.access)]);
    setData({ ...Data, fields: [...Data.fields, FieldAccess] });
    setFieldAccess({ Field: null, access: null });
    setDisplayName({ ...display_name, Field: null, access: null });
    dataref.current.value = null;
    //console.log('add field', Data);
  };

  const handleSubmit = () => {
    console.log(Data);
  };

  return (
    <Grid container xl={12}>
      <Grid item xl={12} lg={12} sm={12} xs={12}>
        <SubCard title="Access Management">
          <Grid container xl={10} spacing={2}>
            <Grid item xl={4} md={6} xs={12}>
              <Autocomplete
                id="combo-box-demo"
                value={display_name.group || ''}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  if (option === '') {
                    return '';
                  }
                  return option.name;
                }}
                options={Array.isArray(group) ? group : []}
                renderInput={(params) => <TextField {...params} label="Group" />}
                fullWidth
                onChange={(e,value) => handleChange('group', value)}
              />
            </Grid>

            <Grid item xl={4} md={6} xs={12}>
              <Autocomplete
                id="combo-box-demo"
                value={display_name.Product || ''}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  if (option === '') {
                    return '';
                  }
                  return option.product_name;
                }}
                options={Array.isArray(Product) ? Product : []}
                renderInput={(params) => <TextField {...params} ref={dataref} label="Product" fullWidth />}
                fullWidth
                onChange={(e,value) => handleChange('product', value)}
              />
            </Grid>
          </Grid>

          <Grid container xl={10} spacing={2} sx={{ mt: 1 }} alignItems="center">
            <Grid item xl={4} md={6} xs={10}>
              <Autocomplete
                value={display_name.Field || ''}
                id="combo-box-demo"
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  if (option === '') {
                    return '';
                  }
                  return option.display_field_name;
                }}
                options={Array.isArray(ProductField) ? ProductField[0].fields : []}
                renderInput={(params) => <TextField {...params} label="Field" />}
                fullWidth
                onChange={(e,value) => handleChange('field',value)}
              />
            </Grid>

            <Grid item xl={4} md={6} xs={10}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Access Type</InputLabel>
                <Select
                  value={display_name.access || ''}
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
