import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { deleteAPI, getApi } from 'API/MDM/apis';
import { CircularProgress, Typography, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { FaPen ,FaTrash} from 'react-icons/fa';
import EditModal from './Components/ViewMDM/EditModal';
import SubCard from 'ui-component/cards/SubCard';

// const ro.ws = [
//   {id:1, type: 1, displayname: 'Snow', name: 'Jon', Unique: true },
//   {id:2, type: 2, displayname: 'Lannister', name: 'Cersei', Unique: 42 },
//   {id:3, type: 3, displayname: 'Lannister', name: 'Jaime', Unique: 45 },
//   {id:4, type: 4, displayname: 'Stark', name: 'Arya', Unique: 16 },
//   {id:5, type: 5, displayname: 'Targaryen', name: 'Daenerys', Unique: null },
//   {id:6, type: 6, displayname: 'Melisandre', name: null, Unique: 150 },
//   {id:7, type: 7, displayname: 'Clifford', name: 'Ferrara', Unique: 44 },
//   {id:8, type: 8, displayname: 'Frances', name: 'Rossini', Unique: 36 },
//   {id:9, type: 9, displayname: 'Roxie', name: 'Harvey', Unique: 65 },

// ];

export default function ViewAddPoints() {
  const [data, setData] = useState([]);
  const [unique, setUnique] = useState([]);
  const [Error, setError] = useState(false);
  const[id, setId] = useState("")

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false)
     getApi(setData, setError);
    };

// //console.log(id);


  useEffect(() => {
    getApi(setData, setError);
    const dat = data.length > 0 ? data[0].map((item) => item.details) : null;
    setUnique(dat);
  }, []);
  console.log(unique);

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'display_name', headerName: 'Display Name', width: 300 },
    {
      field: 'type',
      headerName: 'Type',
      width: 500
    },

    {
      width:200,
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction='row'>
          <Button color="secondary" onClick={() => {
          handleOpen()
          setId(row._id)}}>
            <FaPen />
          </Button>
          <Button color="error" onClick={() => deleteAPI(row._id,getApi,setData,setError)}>
            <FaTrash />
          </Button>
        </Stack>
      )
    }
  ];



  return (
    <SubCard title="MDM Data">
    <div style={{ height: 550, wTypeth: '100%' }}>
      <EditModal open={open} handleClose={handleClose} id={id}/>
      {data.length > 0 ? (
        <DataGrid
          rows={data[0]}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { pUnique: 0, pUniqueSize: 5 }
            }
          }}
          pUniqueSizeOptions={[5, 10]}
        />
      ) : !Error ? (
        <Stack alignItems="center" justifyContent="center" height="50vh">
          <CircularProgress />
          <Typography color="grey">Loading....</Typography>
        </Stack>
      ) : (
        <Stack alignItems="center" justifyContent="center" height="50vh">
        <h4 style={{color:'red'}}>Some thing went wrong!!!</h4>
        </Stack>
      )}
    </div>
    </SubCard>
  );
}
