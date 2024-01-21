import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/system';
import { getById, putAPI } from 'API/MDM/apis';
import MenuItem from '@mui/material/MenuItem';
import { Button, Grid, Select, TextField, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 4
};

const EditModal = (props) => {
  const [Data, setData] = useState('');
  const [Error, setError] = useState(false);

  useEffect(() => {
    console.log(props.id);
    getById(setData, props.id, setError);
  }, [props.id]);

  useEffect(() => {
    console.log(Data);
    console.log(Error);
  }, [Data]);

  const handleChange = (field, value) => {
    switch (field) {
      case 'name':
        setData([{ ...Data[0], name: value }]);
        break;
      case 'display_name':
        setData([{ ...Data[0], display_name: value }]);
        break;
      case 'type':
        setData([{ ...Data[0], type: value }]);
        break;
      case 'Regex':
        setData([{ ...Data[0], details: { ...Data[0].details, Regex: value } }]);
        break;
      case 'maxLength':
        setData([{ ...Data[0], details: { ...Data[0].details, maxLength: value } }]);
        break;
      case 'minLength':
        setData([{ ...Data[0], details: { ...Data[0].details, minLength: value } }]);
        break;
      case 'unique':
        setData([{ ...Data[0], details: { ...Data[0].details, unique: value } }]);
        break;
      default:
        break;
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    putAPI(props.id,Data,props.handleClose)
  }

  return (
    <div>
      <Modal open={props.open} onClose={props.handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            {Array.isArray(Data) &&
              Data.map((item, index) => (
                <Stack spacing={1} key={index}>
                  <Typography>Name</Typography>
                  <TextField value={item.name} onChange={(e) => handleChange('name', e.target.value)} />
                  <Typography>Display Name</Typography>
                  <TextField value={item.display_name} onChange={(e) => handleChange('display_name', e.target.value)} />
                  <Typography>Type</Typography>
                  <TextField value={item.type} disabled />
                  <Grid container xl={12} spacing={1}>
                    {item.details &&
                      Object.keys(item.details).map((key, i) => (
                        <Grid item xl={6} key={i}>
                          <Typography>{key}</Typography>
                          <TextField
                            sx={{ display: key === 'unique' ? 'none' : 'block' }}
                            fullWidth
                            defaultValue={item.details[key]}
                            onChange={(e) => handleChange(key, e.target.value)}
                          />

                          <Grid item xl={10}>
                            <Select
                              sx={{ display: key === 'unique' ? 'block' : 'none' }}
                              value={Data[0].details['unique'] ? 'true' : 'false'}
                              onChange={(e)=>handleChange("unique",e.target.value)}
                            >
                              <MenuItem value={true}>true</MenuItem>
                              <MenuItem value={false}>false</MenuItem>
                            </Select>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                </Stack>
              ))}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
              <Button variant="contained" type="submit">
                Change
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
