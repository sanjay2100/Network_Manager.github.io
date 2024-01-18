import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
// import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { IconCreditCardPay, IconCreditCardRefund  } from '@tabler/icons-react';
// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Transcation</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard />
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={8} sx={{display:"flex"}}>
                      <Avatar
                              variant="rounded"
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark,
                                ml: 2
                              }}
                            >
                              <IconCreditCardPay fontSize="small" />
                            </Avatar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Typography variant="subtitle1" color="inherit">
                      {/* <IconCreditCardPay/> */}
                      Money add to Xxxxxxxx9878
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                            ₹1839.00
                            </Typography>
                          </Grid>
                          {/* <Grid item>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark,
                                marginLeft: 1.875
                              }}
                            >
                              <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item>
                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                      10% Profit
                    </Typography>
                  </Grid> */}
                </Grid>
                <Divider sx={{ mb: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={8} sx={{display:"flex"}}>
                      <Avatar
                              variant="rounded"
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.error.light,
                                color: theme.palette.error.dark,  
                                ml: 2
                              }}
                            >
                              <IconCreditCardRefund fontSize="small" />
                            </Avatar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Typography variant="subtitle1" color="inherit">
                        {/* <IconCreditCardRefund /> */}
                        Money sent to Xxxxxxxx9878
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                            ₹100.00
                            </Typography>
                          </Grid>
                          {/* <Grid item>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.orange.light,
                                color: theme.palette.orange.dark,
                                marginLeft: 1.875
                              }}
                            >
                              <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                      10% loss
                    </Typography>
                  </Grid> */}
                </Grid>
                <Divider sx={{ mb: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={8} sx={{display:"flex"}}>
                      <Avatar
                              variant="rounded"
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark,
                                ml: 2
                              }}
                            >
                              <IconCreditCardPay fontSize="small" />
                            </Avatar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Typography variant="subtitle1" color="inherit">
                        Money Add to Xxxxxxxx9878
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item >
                            <Typography variant="subtitle1" color="inherit">
                              ₹200.00
                            </Typography>
                          </Grid>
                          {/* <Grid item>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark,
                                ml: 2
                              }}
                            >
                              <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.success.dark }}>
                      10% Profit
                    </Typography>
                  </Grid> */}
                </Grid>
                <Divider sx={{ mb: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={8} sx={{display:"flex"}}>
                      <Avatar
                              variant="rounded"
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.error.light,
                                color: theme.palette.error.dark,
                                ml: 2
                              }}
                            >
                              <IconCreditCardPay fontSize="small" />
                            </Avatar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Typography variant="subtitle1" color="inherit">
                        Money sent to Xxxxxxxx9878
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              ₹189.00
                            </Typography>
                          </Grid>
                          {/* <Grid item>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.orange.light,
                                color: theme.palette.orange.dark,
                                ml: 2
                              }}
                            >
                              <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                      10% loss
                    </Typography>
                  </Grid> */}
                </Grid>
                <Divider sx={{ mb: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={8} sx={{display:"flex"}}>
                      <Avatar
                              variant="rounded"
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.error.light,
                                color: theme.palette.error.dark,
                                ml: 2
                              }}
                            >
                              <IconCreditCardPay fontSize="small" />
                            </Avatar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Typography variant="subtitle1" color="inherit">
                        Money sent to Xxxxxxxx9878
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              ₹189.00
                            </Typography>
                          </Grid>
                          {/* <Grid item>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '5px',
                                backgroundColor: theme.palette.orange.light,
                                color: theme.palette.orange.dark,
                                ml: 2
                              }}
                            >
                              <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                      10% loss
                    </Typography>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
