import React from 'react';
// import { useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import { Grid, TextField, Button, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateGroup() {
//   const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'Sno', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'designation',
      headerName: 'Designation',
      width: 150
    },
    {
      field: 'State',
      headerName: 'State',
      width: 200
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <SubCard title="Create Group">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Group created
        </Alert>
      </Snackbar>
      <Grid container xl={12}>
        <Grid item xl={4} sx={{ display: 'flex', verticalAlign: 'center' }}>
          <TextField id="outlined-basic" label="Group name" variant="outlined" fullWidth />
        </Grid>
        {/* <Grid item xl={4} ml={1} sx={{ display: 'flex', alignItems: 'center' }}>
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
          />
        </Grid>
        <Grid container xl={12} justifyContent="flex-end">
          <Grid item xl={2} mt={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                navigate('/Admin/ViewGroup');
              }}
            >
              view Group
            </Button> */}
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Create group
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </SubCard>
  );
}

export default CreateGroup;
