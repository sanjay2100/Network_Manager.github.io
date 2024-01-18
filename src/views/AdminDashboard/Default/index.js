// import { useEffect } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports

// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
// import SubCard from 'ui-component/cards/SubCard';
// import FormIcon from 'assets/images/icons/formIcon.png'
// import FieldIcon from 'assets/images/icons/fieldIcon .png'
// import AccessIcon from 'assets/images/icons/accessIcon.png'
// import GroupIcon from 'assets/images/icons/groupIcon.png'
// import { useNavigate } from 'react-router';
// import { Stack } from '@mui/system';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  // const [isLoading, setLoading] = useState(true);
  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  // const navigate=useNavigate()

  //  const style={
  //   textAlign:'center',
  //   borderRadius:'20px',
  //   backgroundColor:'#fff',
  //   cursor:'pointer',

  //  }

  return (
    <Grid container spacing={gridSpacing}>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xl={4} md={6} sm={12}>
            <SubCard sx={style} onClick={()=>navigate('/Admin/AddProduct')}>
              <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                <img src={FormIcon} alt='' style={{width:'25%',aspectRatio:1}}/>
                <Typography variant='h4' component='div' color='#252525' sx={{mt:0}}>Product Master</Typography>
              </Stack>
            </SubCard>
          </Grid>
          <Grid item xl={4} md={6} sm={12}>
          <SubCard sx={style} onClick={()=>navigate('/Admin/AddDP')}>
              <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                <img src={FieldIcon} alt='' style={{width:'25%',aspectRatio:1}}/>
                <Typography variant='h4' component='div' color='#252525' sx={{mt:0}}>Field Master</Typography>
              </Stack>
            </SubCard>
          </Grid>
          <Grid item xl={4} md={6} sm={12}>
          <SubCard sx={style} onClick={()=>navigate('/Admin/AccessManagement')}>
              <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                <img src={AccessIcon} alt='' style={{width:'25%',aspectRatio:1}}/>
                <Typography variant='h4' component='div' color='#252525' sx={{mt:0}}>Access Management</Typography>
              </Stack>
            </SubCard>
          </Grid>
          <Grid item xl={4} md={6} sm={12}>
          <SubCard sx={style} onClick={()=>navigate('/Admin/CreateGroup')}>
              <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                <img src={GroupIcon} alt='' style={{width:'25%',aspectRatio:1}}/>
                <Typography variant='h4' component='div' color='#252525' sx={{mt:0}}>Create Group</Typography>
              </Stack>
            </SubCard>
          </Grid>
        </Grid>
      </Grid> */}

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
