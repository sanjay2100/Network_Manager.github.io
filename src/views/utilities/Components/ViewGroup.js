import React from 'react';

// material-ui
import { Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// project imports
// import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { DataGrid } from '@mui/x-data-grid';
import { IconPencil } from '@tabler/icons';

// mui Accordion
const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

const ViewGroup = () => {
  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  //   edit group onclick function
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //   list users
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
      width: 150
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 150,
      renderCell: () => {
        const onClick = () => {};
        return (
          <Button variant="outlined" color="error" onClick={() => onClick()}>
            Remove
          </Button>
        );
      }
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

  return (
    <>
      <MainCard title="List of Groups">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            {/* <SubCard title="Group Name">
              <Grid container spacing={gridSpacing}>

              </Grid>
            </SubCard> */}
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography variant="h4">Group Name</Typography>
                <IconPencil color="#2196F3" onClick={handleClickOpen} />
              </AccordionSummary>
              <AccordionDetails>
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
                <Button variant="contained" color="error" sx={{ margin: '15px', float: 'right' }}>
                  Delete group
                </Button>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            {/* <SubCard title="Group Name">
              <Grid container spacing={gridSpacing}>

               </Grid>
            </SubCard> */}
            <Accordion onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography variant="h4">Group Name</Typography>
                <IconPencil color="#2196F3" onClick={handleClickOpen} />
              </AccordionSummary>
              <AccordionDetails>
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
                <Button variant="contained" color="error" sx={{ margin: '15px', float: 'right' }}>
                  Delete group
                </Button>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            {/* <SubCard title="Group Name">
              <Grid container spacing={gridSpacing}>

               </Grid>
            </SubCard> */}
            <Accordion onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography variant="h4">Group Name</Typography>
                <IconPencil color="#2196F3" onClick={handleClickOpen} />
              </AccordionSummary>
              <AccordionDetails>
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
                <Button variant="contained" color="error" sx={{ margin: '15px', float: 'right' }}>
                  Delete group
                </Button>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            {/* <SubCard title="Group Name">
              <Grid container spacing={gridSpacing}>

               </Grid>
            </SubCard> */}
            <Accordion onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography variant="h4">Group Name</Typography>
                <IconPencil color="#2196F3" onClick={handleClickOpen} />
              </AccordionSummary>
              <AccordionDetails>
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
                <Button variant="contained" color="error" sx={{ margin: '15px', float: 'right' }}>
                  Delete group
                </Button>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            {/* <SubCard title="Group Name">
              <Grid container spacing={gridSpacing}>

               </Grid>
            </SubCard> */}
            <Accordion onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography variant="h4">Group Name</Typography>
                <IconPencil color="#2196F3" onClick={handleClickOpen} />
              </AccordionSummary>
              <AccordionDetails>
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
                <Button variant="contained" color="error" sx={{ margin: '15px', float: 'right' }}>
                  Delete group
                </Button>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </MainCard>

      {/* edit group name */}
      <Dialog
        open={open}
        // onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          }
        }}
      >
        <DialogTitle variant='h3'>Edit Group Name</DialogTitle>
        <DialogContent>
          <DialogContentText variant='h4'>To change the group name, please enter the group name here</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Enter group name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">save changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewGroup;
