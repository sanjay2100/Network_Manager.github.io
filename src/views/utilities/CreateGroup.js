import React, { useState, useEffect } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import { Grid, TextField, Button, Snackbar, Modal, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MuiAlert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import { AddUser, CreateGroup, GetGroups, getAllUsers } from 'API/Groups/apis';

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

  const[getData,setGetData] = useState(null)
  const[SelectedGroup,SetSelectedGroup]=useState(null);

  const [PostData, setPostData] = useState({
    members: []
  });

  useEffect(() => {
    console.log(SelectedRows);
    if(SelectedRows!==''){
      SelectedRows.forEach(element => {
        setMemberData({ ...memberData, members: [...memberData.members,element._id ] });
      });
    }
  }, [SelectedRows]);




  const columns = [
    { field: 'name', headerName: 'Group members', width: 200 },

  ];

  const[rows,setRows]=useState("")
  const[Arg,setArg]=useState(null)
  useEffect(()=>{
    console.log("Selected group",SelectedGroup);
    if(SelectedGroup){
      setRows(SelectedGroup.members)

    }
  },[SelectedGroup])

  useEffect(()=>{
    if(SelectedGroup){
      setRows(SelectedGroup.members)

    }
    const augmentedRows =Array.isArray(rows)? rows.map((value, index) => ({ id: index, name:value })):null;

    setArg(augmentedRows)
  },[getData])

  useEffect(()=>{
    const augmentedRows =Array.isArray(rows)? rows.map((value, index) => ({ id: index, name:value })):null;

    setArg(augmentedRows)
  },[rows])
  console.log("arg",Arg);

  const [open, setOpen] = React.useState(false);
  const[ErrOpen,setErrOpen]=useState(false);
  const [snackopen, setSnackopen] = React.useState(false);
  const [groupopen, setGroupopen] = useState(false);



  const handleClick = () => {
    setOpen(true);
  };

  const handleErrClick = () => {
    setErrOpen(true);
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
    setErrOpen(false);
  };

  const handleGroupclick = () => {
    setGroupopen(true);
  };

  const [userRows,setUserRows]=useState([])

  // const userRows = [
  //   { id: '1', lastName: 'Snow', firstName: 'Jon', age: 14 },
  //   { id: '2', lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  //   { id: '3', lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  //   { id: '4', lastName: 'Stark', firstName: 'Arya', age: 11 },
  //   { id: '5', lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: '6', lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: '7', lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: '8', lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: '9', lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  const userColumns = [
    {
      field: 'name',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: true,
    },

  ];


  const handleDataChange = (field, value) => {
    switch (field) {
      case 'Name':
        setPostData({
          ...PostData,
          name: value
        });
        break;
      case 'description':
        setPostData({
          ...PostData,
          description: value
        });
        break;

      default:
        break;
    }
  };

  // get api call

  useEffect(()=>{
    GetGroups(setGetData)
    getAllUsers(setUserRows)
  },[])

  const[memberData,setMemberData]=useState({members:[]})

  const createGroup=()=>{
     const grpId=SelectedGroup._id;
     AddUser(grpId,memberData,setGetData,handleClick,handleErrClick)
     SetSelectedGroup([])

  }

  console.log("memberdata",memberData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    CreateGroup(PostData,handlesnackClick,setPostData)
  }

  return (
    <SubCard title="Add User to Group ">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          User Added to Group
        </Alert>
      </Snackbar>

      <Snackbar open={ErrOpen} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          User already exist
        </Alert>
      </Snackbar>

      {/* new group add modal start */}
      <Modal open={groupopen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <SubCard title="Create Group">
            <Snackbar
              open={snackopen}
              autoHideDuration={2000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Group created
              </Alert>
            </Snackbar>
            <Grid container xl={12}>
              <Grid item xl={4} sx={{ display: 'flex', verticalAlign: 'center' }} mb={2}>
                <TextField
                  id="outlined-basic"
                  label="Group name"
                  variant="outlined"
                  value={PostData.name?PostData.name:""}
                  fullWidth
                  onChange={(e) => handleDataChange('Name', e.target.value)}
                />
              </Grid>
              <Grid container xl={12}>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: '100%'
                  }}
                >
                  <TextField
                    fullWidth
                    label="Group decription"
                    value={PostData.description?PostData.description:""}
                    id="fullWidth"
                    onChange={(e) => handleDataChange('description', e.target.value)}
                  />
                </Box>
              </Grid>

              <Grid container xl={12} justifyContent="flex-end">
                <Grid item xl={2} mt={1}>
                  <Button variant="contained" color="secondary" onClick={handleSubmit}>
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
            options={getData?getData:[]}
            getOptionLabel={ (option) => option.name}

            onChange={(event, selectedOption) => SetSelectedGroup(selectedOption)}
            sx={{ width: 300 }}


            renderInput={(params) => <TextField {...params} label="Select group" />}
          />
        </Grid>
        <Grid item xl={2} mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" color="secondary" onClick={handleGroupclick}>
            Create New Group
          </Button>
        </Grid>
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
        <Grid container mt={1} xl={12} sm={12} xs={12} spacing={1}>
        <Grid item xl={6} md={12} sm={12} xs={12}>
          <DataGrid
            rows={Array.isArray(Arg)?Arg:[]}
            columns={columns}
            sx={{height:'20rem'}}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
           
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            getRowId={(row) => row.id}
            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows =Array.isArray(Arg)&& Arg.filter((row) => selectedIDs.has(row.id));
              setSelectedRows(selectedRows);
            }}
          />
        </Grid>
        <Grid item mt={{xl:0,lg:1,md:1}} xl={6} md={12} sm={12} xs={12}>
          <DataGrid
            rows={Array.isArray(userRows)?userRows:[]}
            columns={userColumns}
            sx={{height:'20rem'}}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = userRows.filter((row) => selectedIDs.has(row._id));
              setSelectedRows(selectedRows);
            }}
          />
        </Grid>
        </Grid>
        <Grid container xl={12} justifyContent="flex-end">
          <Grid item xl={2} mt={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="secondary" onClick={createGroup}>
              add users
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </SubCard>
  );
}

export default AdduserGroup;
