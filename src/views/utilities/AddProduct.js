import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Grid, Button, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';
import SubCard from 'ui-component/cards/SubCard';
import IconButton from '@mui/material/IconButton';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import FieldModal from './Components/AddProduct/FieldModal';
import EditModal from './Components/AddProduct/EditModal';
import { PostApi, getApi, deleteApi, getById, postNewFieldApi } from 'API/Products/apis';
import AddMoreModal from './Components/AddProduct/AddMoreFields';
import Alert from '@mui/material/Alert';

function createData(name, type, required, icon) {
  return { name, type, required, icon };
}

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [OpenAddMore,setOpenAddMore] = useState(false);
  const [post, setPost] = useState([]);
  const [TableRows, setTableRows] = useState([]);
  const [rows, setRows] = useState([]); //set all product

  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});
  const [Error, setError] = useState(false);
  const [Data, setData] = useState({
    id: '',
    name: '',
    type: '',
    required: ''
  });

  const[NameErr,setnameErr]=useState(false)
  const[DnameErr,setDnameErr]=useState(false)

  const[AddMoreFields, setAddMoreFields] = useState({})

  const [OpenAlert, setOpenAlert] = useState(false);
  const [ErrAlert,setErrAlert]=useState(false)

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (event,reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
    setErrAlert(false)
  };

  // const [Product, setProduct] = useState({})
  // const[getData,setGetData]=useState([])
  const dataref = useRef();
  const handleOpen = () => setOpen(true);
  const handleOpenAddMore=()=>setOpenAddMore(true)
  const handleClose = () =>{
    setOpen(false);
    setOpenAddMore(false);
   // setTableRows([])
  }
  //   edit Modal
  const [editOpen, setEditOpen] = useState(false);
  const [EditData, setEditData] = useState([]);
  const handleClickOpen = (id) => {
    //console.log(id);
    //console.log(rows);

   getById(id,setEditData)
    //console.log(EditData);
    setEditOpen(true);
  };
  const handleviewClose = () => {
    setEditOpen(false);
  };

  //console.log(EditData);

  const [PostData, setPostData] = useState({
    product_name: '',
    display_name: '',
    fields: ''
  });

  const handleCellEditStop = React.useCallback((params, event) => {
    event.defaultMuiPrevented = true;
  }, []);

  const handleDataChange = (field, value) => {
    if (field === 'Name') {
      setnameErr(false)
      setPostData({ ...PostData, product_name: value });
    } else if (field === 'displayName') {
      setDnameErr(false)
      setPostData({ ...PostData, display_name: value });
    }
  };

  const cellMode = useMemo(() => {
    if (!selectedCellParams) {
      return 'view';
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || 'view';
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback(
    (params, event) => {
      if (cellMode === 'edit') {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode]
  );

  const handleClickedit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === 'edit') {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } }
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } }
      });
    }
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  function createTableData(name, calories, fat) {
    return { name, calories, fat };
  }

  const handleDelete = (id) => {
    //console.log(id);
    deleteApi(id, getApi, setRows);
  };

  const [editrows, setEditRows] = useState([]);
  useEffect(() => {
    //console.log(EditData);
    setEditRows([])
    if (EditData[0]) {
      //console.log("jk", EditData[0].fields);
      EditData[0].fields.map((field) => {
        //console.log("jk", field.field_name);
       return setEditRows([...editrows, createTableData(field.field_name, field.display_field_name)]);
      });
    }
  }, [EditData]);

  //console.log(editrows);

  // const editrows = [
  //

  //   createTableData('Date', 'date', ['false', 'true']),
  //   createTableData('Email', 'email', ['false', 'true']),
  //   createTableData('Age', 'number', ['false', 'true'])
  // ];

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'product_name', headerName: 'Product name', width: 230 },
    { field: 'display_name', headerName: 'Display name', width: 230 },
    {
      field: 'edit',
      headerName: '',
      type: 'number',
      editable: 'false',
      width: 30,
      renderCell: () => (
        <IconButton
          aria-label="edit"
          // onClick={handleClickedit}
          color="info"
        >
          {' '}
          <IconPencil />
        </IconButton>
      )
    },
    {
      field: 'view',
      headerName: 'Action',
      type: 'number',
      width: 55,
      renderCell: (params) => (
        <IconButton aria-label="view" onClick={() => handleClickOpen(params.row._id)} color="success">
          {' '}
          <IconEye />
        </IconButton>
      )
    },
    {
      field: 'delete',
      headerName: '',
      type: 'number',
      width: 30,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          onClick={() => {
            //console.log(params);
            handleDelete(params.row._id);
          }}
          color="error"
        >
          {' '}
          <IconTrash />
        </IconButton>
      )
    }
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
    // }
  ];

  // const rows = [
  //   { id: 1, productName: 'Snow', displayName: 'Jon' },
  //   { id: 2, productName: 'Lannister', displayName: 'Cersei' },
  //   { id: 3, productName: 'Lannister', displayName: 'Jaime' },
  //   { id: 4, productName: 'Stark', displayName: 'Arya' },
  //   { id: 5, productName: 'Targaryen', displayName: 'Daenerys' },
  //   { id: 6, productName: 'Melisandre', displayName: 'Stark' },
  //   { id: 7, productName: 'Clifford', displayName: 'Ferrara' },
  //   { id: 8, productName: 'Frances', displayName: 'Rossini' },
  //   { id: 9, productName: 'Roxie', displayName: 'Harvey' }
  // ];


  //Add new field to existing product

  const handleAddNewProduct =()=>{
    postNewFieldApi(AddMoreFields.productId,{fields:AddMoreFields.fields},handleClickOpen,handleClose)
  }

  useEffect(() => {
    getApi(setRows);
  }, []);

  useEffect(() => {
    //console.log(rows['products']);
  }, [rows]);

  const handleChange = (type, value) => {
    if (type === 'field') {
      //console.log(value);
      //console.log(value.name);
      setData({ ...Data, name: value.name, type: value.type, id: value._id, display_name: value.display_name });
      //console.log(Data);
    } else {
      //console.log(value);

      setData({ ...Data, required: value });
      //console.log(Data);
    }
  };



  const deleteAddedData = (index) => {
    //console.log(index);

    const updatedPost = [...post.slice(0, index), ...post.slice(index + 1)];
    const updatedTable = [...TableRows.slice(0, index), ...TableRows.slice(index + 1)];

    setPost(updatedPost);
    setTableRows(updatedTable);
    setPostData({ ...PostData, fields: post });
    //console.log(PostData);
  };

  const handleCellFocus = useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);

  const handleAddData = (e) => {
    e.preventDefault();
    //console.log("tr: ",TableRows);
    const updataedData = [...post, { field_obj_id: Data.id, value_required: Data.required }];

    setTableRows([...TableRows, createData(Data.name, Data.type, Data.required, 'x')]);
    //console.log(TableRows);

    setData({ ...Data, name: '', type: '', required: '' });
    dataref.current.value = null;

    setPost(updataedData);

    //console.log(post);
  };

  useEffect(() => {
    setPostData({ ...PostData, fields: post });
  }, [post]);

  //console.log(PostData);




  const handleSubmit = (e) => {
    e.preventDefault();
    setnameErr(false)
    setDnameErr(false)
     if(PostData.product_name===""||!PostData.product_name){
      setnameErr(true)
      setErrAlert(true)
    }
    else if(PostData.display_name===""||!PostData.display_name){
      setDnameErr(true)
      setErrAlert(true)

    }

   else PostApi(PostData, getApi, setRows, setData, setPostData, setPost, setTableRows, handleClick);
  };




  return (
    <SubCard title="Add Product">
      {/* Add field modal */}
      <Snackbar
      open={OpenAlert}
      autoHideDuration={6000}
      onClose={handleAlertClose}
      >
        <Alert  severity="success" sx={{ width: '100%' }}>
          User Added to Group
        </Alert>
      </Snackbar>

      <Snackbar
      open={ErrAlert}
      autoHideDuration={6000}
      onClose={handleAlertClose}
      anchorOrigin={{vertical:'top',horizontal:'right'}}
      >
        <Alert  severity="error" sx={{ width: '100%' }}>
          Fill the required fields
        </Alert>
      </Snackbar>

      <FieldModal
        open={open}
        handleChange={handleChange}
        deleteAddedData={deleteAddedData}
        handleAddData={handleAddData}
        handleClose={handleClose}
        Data={Data}
        setData={setData}
        dataref={dataref}
        TableRows={TableRows}
        setTableRows={setTableRows}
        Error={Error}
        setError={setError}
      />

      <AddMoreModal
      open={OpenAddMore}
      handleChange={handleChange}
      deleteAddedData={deleteAddedData}
      handleAddData={handleAddData}
      handleClose={handleClose}
      Data={Data}
      setData={setData}
      dataref={dataref}
      TableRows={TableRows}
      setTableRows={setTableRows}
      Error={Error}
      setError={setError}
      handleSubmit={handleAddNewProduct}
      />

      {/* End of add field modal */}
      <form onSubmit={handleSubmit}>
        <Grid container xl={12}>
          <Grid item xl={6} md={6} xs={12}>
            <TextField
              error={NameErr}
              size="large"
              label="Product Name"
              fullWidth
              value={PostData.product_name || ''}
              onChange={(e) => handleDataChange('Name', e.target.value, null)}
            />
          </Grid>

          <Grid container sx={{ mt: 4 }} xl={12} justifyContent="space-between">
            <Grid item xl={6} md={6} xs={12}>
              <TextField
                error={DnameErr}
                size="large"
                label="Product display name"
                value={PostData.display_name || ''}
                fullWidth
                onChange={(e) => handleDataChange('displayName', e.target.value, null)}
              />
              <Stack direction="row" justifyContent="flex-end" width="100%">
                <Button sx={{ width: 'fit-content' }} color="secondary" onClick={handleOpen}>
                  Add fields
                </Button>
              </Stack>
            </Grid>
            <Grid item xl={6} sx={{ width: { xl: 'fit-content', md: '100%' }, height: { md: '5vh', xl: '10vh', xs: '10vh' } }}>
              <Stack direction="column" justifyContent="flex-end" height="100%">
                <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
                  <Button variant="contained" color="secondary" type="submit">
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          {/* Product list start */}
          <Typography variant="h4" m={2}>
            Product List
          </Typography>
          <Box p={1}>
            <Button onClick={handleClickedit} onMouseDown={handleMouseDown} disabled={!selectedCellParams} variant="outlined">
              {cellMode === 'edit' ? 'Save' : 'Edit'}
            </Button>
            <Button onClick={handleClose} onMouseDown={handleMouseDown} disabled={cellMode === 'view'} variant="outlined" sx={{ ml: 1 }}>
              Cancel
            </Button>
          </Box>
          {rows ? (
            <Grid item style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                onCellKeyDown={handleCellKeyDown}
                cellModesModel={cellModesModel}
                disableRowSelectionOnClick
                onCellEditStop={handleCellEditStop}
                onCellModesModelChange={(model) => setCellModesModel(model)}
                // sx={{height: "92%"}}
                // slots={{
                //   toolbar: EditToolbar,
                // }}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 }
                  }
                }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
                slotProps={{
                  toolbar: {
                    cellMode,
                    selectedCellParams,
                    setSelectedCellParams,
                    cellModesModel,
                    setCellModesModel
                  },
                  cell: {
                    onFocus: handleCellFocus
                  }
                }}
              />
            </Grid>
          ) : (
            <p>Loading....</p>
          )}
        </Grid>
      </form>
      {/* Edit Modal */}

      <EditModal editOpen={editOpen} handleviewClose={handleviewClose} editrows={EditData[0]?EditData[0].fields:null} handleOpen={handleOpenAddMore} productId={EditData[0]?EditData[0]._id:null} post={post} AddMoreFields={AddMoreFields} setAddMoreFields={setAddMoreFields}  handleClickOpen={handleClickOpen} totalData={EditData[0]?EditData[0]:null}/>
    </SubCard>
  );
};

export default AddProduct;
