import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Grid, Button, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IconTrash } from '@tabler/icons';
import { getApi } from 'API/MDM/apis';

// eslint-disable-next-line react/prop-types
const AddMoreModal = ({ open, handleChange, deleteAddedData, handleAddData, handleClose, Data, dataref, TableRows ,setTableRows,Error,setError,handleSubmit}) => {
  // const top100Films = [
  //   { id: 1, label: 'Name', type: 'Text' },
  //   { id: 2, label: 'Email', type: 'email' },
  //   { id: 3, label: 'Address', type: 'Text' },
  //   { id: 4, label: 'Aadhar No', type: 'Text' },
  //   { id: 5, label: 'Pan No', type: 'text' },
  //   { id: 6, label: 'Phone Number', type: 'text' },
  //   { id: 7, label: 'Age', type: 'text' }
  // ];

  const [MdmData, setMDMData] = useState([]);

  useEffect(() => {
    getApi(setMDMData,setError);
    console.log(Error);
  }, []);
  // console.log(MdmData);


  const handleDragStart = (index) => (e) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = () => (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => (e) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);

    // Swap the items at the dragged index and the drop index
    const newItems = [...TableRows];
    [newItems[index], newItems[draggedIndex]] = [newItems[draggedIndex], newItems[index]];

    // Update the state with the new order of items
    setTableRows(newItems);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '80%',
    borderRadius: '20px',
    bgcolor: 'whitesmoke',
    border: 'none',
    boxShadow: 24,
    p: 4
  };

  

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h3" component="h2">
          Add Fields
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container xl={12} mt={2} justifyContent="space-between">
          {MdmData.length > 0 ? (
            <Grid item xl={4} md={12} xs={12}>
              <Autocomplete
                value={Data.name || ''}
                ref={dataref}
                disablePortal
                id="combo-box-demo"
                options={MdmData[0]}
                getOptionSelected={(option, value) => option === value}
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
                renderInput={(params) => <TextField {...params} label="Field" />}
                fullWidth
                onChange={(event, newValue) => {
                  handleChange('field', newValue);
                }}
              />
              <FormControl sx={{ mt: 2, minWidth: '100%' }} size="large">
                <InputLabel id="demo-select-label">Mandatory</InputLabel>
                <Select
                  value={Data.required}
                  ref={dataref}
                  labelId="demo-select-label"
                  id="demo-select"
                  label="Mandatory"
                  onChange={(e) => handleChange('mandatory', e.target.value)}
                >
                  <MenuItem value={true}>Yes</MenuItem>

                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={handleAddData}>
                Add
              </Button>
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                Save
              </Button>
            </Grid>
          ) : (
            <p>Loading.....</p>
          )}
          <Grid item xl={6} md={12} xs={12} sx={{ mt: { xl: 0, xs: 1 } }}>
            <TableContainer component={Paper} sx={{ height: { xl: 350, sm: 200, xs: 280 }, overflowY: 'scroll' }}>
              <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Required</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(TableRows)&&TableRows.length>0&&TableRows.map((row, index) => (
                    <TableRow
                      draggable
                      onDragStart={handleDragStart(index)}
                      onDragOver={handleDragOver(index)}
                      onDrop={handleDrop(index)}
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } ,cursor: 'pointer'}}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.required === true ? 'true' : 'false'}</TableCell>
                      <TableCell align="right" onClick={() => deleteAddedData(index)} sx={{ color: 'red' }}>
                        {<IconTrash />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddMoreModal;
