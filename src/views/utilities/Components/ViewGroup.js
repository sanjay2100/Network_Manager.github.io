import React ,{useState,useEffect}from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
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
import { IconPencil } from '@tabler/icons';
import { DeleteGroup, GetGroups } from 'API/Groups/apis';

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

  // Variable for storing group
  const [Group,setGroup]=useState(null)



  //delete user from a group
const handleUserDelete=(grpId,userId)=>{
  console.log(grpId,userId)
}

//delete a group
const handleGroupDelete=(grpId)=>{
  DeleteGroup(grpId ,setGroup)
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// get all groups

  useEffect(()=>{
    GetGroups(setGroup)
  },[])

  console.log(Group);
  
  //   list users
 

const[rows,setRows]=useState([])

const AddMembersTable=()=>{
  if(Array.isArray(Group)){
    Group.map(item=>{
      item.members.map((member,index)=>{
        setRows([...rows,{id:index,userid:member}])
      })
    })
  }
}

useEffect(()=>{
    AddMembersTable()
},[Group])

console.log(rows);

//console.log("backendurl ",process.env.REACT_APP_BASE_URL);


  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', designation: 'DS', State: 'Tamil Nadu' },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', designation: 'TM', State: null },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', designation: 'DS', State: 'Delhi' },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', designation: 'TH', State: 'kerala' },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', designation: 'SH', State: 'Andhra' },
  //   { id: 6, lastName: 'Melisandre', firstName: null, designation: 'RM', State: 'Tamil Nadu' },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', designation: 'DS', State: 'Tamil Nadu' },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', designation: 'AGENT', State: 'Tamil Nadu' },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', designation: 'AGENT', State: 'Tamil Nadu' }
  // ];

  return (
    <>
      <MainCard title="List of Groups">
        <Grid container spacing={gridSpacing}>
        {Array.isArray(Group) && Group.map((item,index)=>(

          <Grid item xs={12}  key={index}>
            {/* <SubCard title="Group Name">
              <Grid container spacing={gridSpacing}>

              </Grid>
            </SubCard> */}
              <Accordion expanded={expanded === index} onChange={handleChange(index)}>
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography variant="h4">{item.name}</Typography>
                <IconPencil color="#2196F3" onClick={handleClickOpen} />
              </AccordionSummary>
              <AccordionDetails>
                <table style={{width:'100%'}}>
                  <thead>
                    <tr>
                      <th style={{textAlign:'left',paddingBlock:'10px',borderBottom:'2px solid #DFDFDF'}}>Name</th>
                      <th style={{borderBottom:'2px solid #DFDFDF'}}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.members.map((tab,tabindex)=>(
                      <tr key={tabindex}>
                        <td style={{paddingBlock:'10px',borderBottom:'1px solid #DFDFDF'}}>{tab.name}</td>
                        <td style={{color:'red',textAlign:"right",borderBottom:'1px solid #DFDFDF'}} ><RemoveCircleIcon sx={{cursor:'pointer'}} onClick={handleUserDelete(item.group_id,tab)}/></td>
                      </tr>
                    ))}
                  </tbody>
                 </table>
                <Button variant="contained" color="error" sx={{ margin: '15px', float: 'right' }} onClick={()=>handleGroupDelete(item._id)}>
                  Delete group
                </Button>
              </AccordionDetails>
            </Accordion>
            
          </Grid>
                      ))}

        
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
