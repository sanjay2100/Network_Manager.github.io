/* eslint-disable react/prop-types */
import React,{useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { Button, Stack } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { IconTrash } from '@tabler/icons';
import { DeleteExistingField } from 'API/Products/apis';

// eslint-disable-next-line react/prop-types
const EditModal = ({ editOpen, handleviewClose, editrows, handleOpen ,productId,post,AddMoreFields,setAddMoreFields,handleClickOpen}) => {
 
  console.log("productId :",productId);
  console.log("postData :",post);

  useEffect(()=>{
    
    setAddMoreFields(
      {...AddMoreFields,fields:post,productId:productId}
    )
  },[post])

console.log("Add more fields",AddMoreFields);

console.log("edit ",editrows);

const handleDelete = (id) => {
  DeleteExistingField(productId,id,handleClickOpen)
}

  return (
    <Dialog open={editOpen} onClose={handleviewClose} maxWidth='100%'>
      <DialogTitle variant="h3" sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Product title (Product display name)
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleviewClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Stack direction="row" justifyContent="flex-end" width="100%">
          <Button sx={{ width: 'fit-content' }} onClick={handleOpen}>
            Add fields
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Field Name</TableCell>
                <TableCell align="left">Display Name</TableCell>
                <TableCell align="left">Mandatory</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            {Array.isArray(editrows)&&editrows.length>0&&editrows[0].field_id!==null?
            <TableBody>
            {Array.isArray(editrows)&&(editrows.length>0&&editrows[0].field_id!==null)&&editrows.map((row) => (
              <TableRow key={row.display_field_name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                <TableCell component="th" scope="row" align="left">
                  {row.field_name}
                </TableCell>
                <TableCell align="left">{row.display_field_name}</TableCell>
                <TableCell>
                  <Select sx={{ width: '80%' }} 
                  value={row.value_required}
                  >
                    <MenuItem value={true} >True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="center" sx={{ color: '#D84646' }}>
                  {<IconTrash onClick={()=>handleDelete(row.field_id)}/>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          :
          <p style={{textAlign:'center'}}>No fields added</p>
          }
            
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleviewClose}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
