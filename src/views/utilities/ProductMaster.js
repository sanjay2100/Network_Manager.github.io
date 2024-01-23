import { Grid, Button, Stack } from '@mui/material';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SubCard from 'ui-component/cards/SubCard';
import { useNavigate } from 'react-router';

function ProductMaster() {
  const [Data, setData] = React.useState({
    name: '',
    field: '',
    mandatory: ''
  });

  const handleChange = (name, value) => {
    if (name === 'name') {
      setData({ ...Data, name: value });
    } else if (name === 'field') {
      setData({ ...Data, field: value });
    } else if (name === 'mandatory') {
      setData({ ...Data, mandatory: value });
    }
    //console.log(Data);
  };

  const Navigate = useNavigate();

  return (
    <SubCard title="Product Master">
      <Grid container xl={12}>
        <Grid item xl={5}>
          <FormControl sx={{ m: 2, minWidth: '100%' }} size="large">
            <InputLabel id="demo-select-small-label">Product Name</InputLabel>
            <Select
              labelId="demo-select-label"
              id="demo-select"
              value={Data.name}
              label="Product Name"
              onChange={(e) => handleChange('name', e.target.value)}
            >
              <MenuItem value={'10'}>Ten</MenuItem>
              <MenuItem value={'20'}>Twenty</MenuItem>
              <MenuItem value={'30'}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 2, minWidth: '100%' }} size="large">
            <InputLabel id="demo-select-small-label">Product Field</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={Data.field}
              label="Product Field"
              onChange={(e) => handleChange('field', e.target.value)}
            >
              <MenuItem value={'10'}>Ten</MenuItem>
              <MenuItem value={'20'}>Twenty</MenuItem>
              <MenuItem value={'30'}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 2, minWidth: '100%' }} size="large">
            <InputLabel id="demo-select-label">Mandatory</InputLabel>
            <Select
              labelId="demo-select-label"
              id="demo-select"
              value={Data.mandatory}
              label="Mandatory"
              onChange={(e) => handleChange('mandatory', e.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>

              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={7} height={{ xl: '60vh', md: '60vh', sm: '50vh', xs: '20vh' }}>
          <Stack direction="column" justifyContent="flex-end" height="100%">
            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
              <Button variant="outlined" color="secondary" onClick={() => Navigate('/Admin/AddProduct')}>
                Add Product
              </Button>
              <Button variant="contained" color="secondary">
                Submit
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </SubCard>
  );
}

export default ProductMaster;
