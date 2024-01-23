import React, { useState, useEffect } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import { Grid, TextField, Button, Snackbar, Modal, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MuiAlert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
// import { Link } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 5,
  p: 4
};

function AdduserGroup() {
  const [SelectedRows, setSelectedRows] = useState('');

  useEffect(() => {
    console.log(SelectedRows);
  }, [SelectedRows]);

  const columns = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 200 },
    {
      field: 'designation',
      headerName: 'Designation',
      width: 150
    }
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', designation: 'DS', State: 'Tamil Nadu' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', designation: 'TM', State: null },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', designation: 'DS', State: 'Delhi' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', designation: 'TH', State: 'kerala' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', designation: 'SH', State: 'Andhra' },
    { id: 6, lastName: 'Melisandre', firstName: null, designation: 'RM', State: 'Tamil Nadu' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', designation: 'DS', State: 'Tamil Nadu' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', designation: 'AGENT', State: 'Tamil Nadu' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', designation: 'AGENT', State: 'Tamil Nadu' }
  ];

  const [open, setOpen] = React.useState(false);
  const [snackopen, setSnackopen] = React.useState(false);
  const [groupopen, setGroupopen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handlesnackClick = () => {
    setSnackopen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setGroupopen(false);
    setSnackopen(false);

  };

  const handleGroupclick = () => {
    setGroupopen(true);
  };

  const top100Films = [
    { label: 'Group1', year: 1994 },
    { label: 'Group2', year: 1972 },
    { label: 'Group3', year: 1974 },
    { label: 'Group4', year: 2008 },
    { label: 'Group5', year: 1957 },
    { label: 'Group6', year: 1993 },
    { label: 'Group7', year: 1994 }
  ];

  return (
    <SubCard title="Add User to Group ">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          User Added to Group
        </Alert>
      </Snackbar>
      {/* new group add modal start */}
      <Modal open={groupopen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <SubCard title="Create Group">
            <Snackbar open={snackopen} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Group created
              </Alert>
            </Snackbar>
            <Grid container xl={12}>
              <Grid item xl={4} sx={{ display: 'flex', verticalAlign: 'center' }} mb={2}>
                <TextField id="outlined-basic" label="Group name" variant="outlined" fullWidth />
              </Grid>
              <Grid container xl={12}>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: '100%'
                  }}
                >
                  <TextField fullWidth label="Group decription" id="fullWidth" />
                </Box>
              </Grid>

              <Grid container xl={12} justifyContent="flex-end">
                <Grid item xl={2} mt={1}>
                  <Button variant="contained" color="secondary" onClick={handlesnackClick}>
                    Create group
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </SubCard>
        </Box>
      </Modal>
      {/* new group add modal end */}
      <Grid container xl={12}>
        <Grid item xl={4} sx={{ display: 'flex', verticalAlign: 'center' }}>
          {/* <TextField id="outlined-basic" label="Group name" variant="outlined" fullWidth /> */}
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select group" />}
          />
        </Grid>
        <Grid item xl={2} mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" color="secondary" onClick={handleGroupclick}>
            Create New Group
          </Button>
        </Grid>
        {/* <Grid item xl={2} mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="secondary" component={Link} to="/Admin/ViewGroup" onClick={handleGroupclick}>
            View Group
          </Button>
        </Grid> */}
        {/* <Grid item xl={2} ml={1} mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" color="secondary" onClick={handleClick}>
            Create Group
          </Button>
        </Grid>
        <Grid item xl={2} ml={1} mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" color="secondary" onClick={handleClick}>
            Create Group
          </Button>
        </Grid> */}
        <Grid item xl={12} mt={2}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
              setSelectedRows(selectedRows);
            }}
          />
        </Grid>
        <Grid container xl={12} justifyContent="flex-end">
          <Grid item xl={2} mt={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="secondary" onClick={handleClick}>
              add users
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </SubCard>
  );
}

export default AdduserGroup;
