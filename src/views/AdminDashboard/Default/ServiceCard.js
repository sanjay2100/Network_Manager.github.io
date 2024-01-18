import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { useNavigate } from 'react-router';
// assets


const CardWrapper = styled(MainCard)(() => ({
  backgroundColor: '#EDE7F6',
  color: '#252525',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '8px',
  cursor: 'pointer',
  aspectRatio: '1',
  '&:hover': {
    border: '2.5px solid #2bb9ed'
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const ServiceCard = ({ item, isLoading }) => {

  const Nav=useNavigate()



  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) :

      
        (

          <CardWrapper border={false} content={false} onClick={()=>Nav(`/dashboard/Services/${item.id}`)}>
            <Box sx={{ width: 'fit-content', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Grid container direction="column" justifyContent='space-between'>
                <Grid item>
                  <Grid container >
                    <Grid item  sx={{ width: '100%', display: 'flex', justifyContent: 'center', color: '#8460cc' }}>
                      {item.Icon}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item >
                      <Typography variant='h3' component='div' fontSize={{ xs: '12px', sm: '18px', md: '18px' }} marginTop={{ xl: '20px', md: '15px', sm: '20px', xs: '15px' }} color='#252525'> {item.name}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </Box>
          </CardWrapper>
        )
      }
    </>
  );
};

ServiceCard.propTypes = {
  isLoading: PropTypes.bool,
  item: PropTypes.any
};

export default ServiceCard;
