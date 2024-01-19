import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// material-ui
// import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  // Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  // IconButton,
  // InputAdornment,
  // InputLabel,
  // OutlinedInput,
  TextField,
  // TextField,
  Typography,
  
  // useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
// import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { Stack } from '@mui/system';

// assets
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  // const theme = useTheme();
  const scriptedRef = useScriptRef();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  // const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [otpState,setotpState]=useState({
    mobile:'none',
    email:'none'
  })

  const handleStateChange=(e)=>{
    if(e==='Otp'){
      setotpState({...otpState,mobile:'flex'})
      console.log(scriptedRef.current.valueOf("phone"));
    }
    else{
      setotpState({...otpState,email:'flex'})
    }
  }
  

  // const [strength, setStrength] = useState(0);
  // const [level, setLevel] = useState();

  // const googleHandler = async () => {
  //   console.error('Register');
  // };

  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  // const changePassword = (value) => {
  //   const temp = strengthIndicator(value);
  //   setStrength(temp);
  //   setLevel(strengthColor(temp));
  // };

  // useEffect(() => {
  //   changePassword('123456');
  // }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={3}>
        {/* <Grid item xs={12}>
          <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={googleHandler}
              size="large"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Sign up with Google
            </Button>
          </AnimateButton>
        </Grid> */}
        {/* <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              OR
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid> */}
        
      </Grid>

      <Formik
        initialValues={{
          email: '',
          phone: '',
          otp:'',
          code:'',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          phone: Yup.string('Must be a number').min(10,'Phone number must have min 10 digit ').max(10,'Phone number must have max 10 digit').required('Phone number is required'),
          otp:Yup.string().required('Otp is required'),
          code:Yup.string().required('Code is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            {/* <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="fname"
                  type="text"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lname"
                  type="text"
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
            </Grid> */}
              <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{marginTop:'25px'}}>
                {/* <InputLabel htmlFor="outlined-adornment-email-register">Mobile Number</InputLabel> */}
                <TextField
                  error={touched.phone&&errors.phone}
                  id="outlined-error"
                  type="text"
                  label='Mobile Number'
                  value={values.phone}
                  size='small'
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  
                  inputProps={{}}
                  
                />
                {touched.phone && errors.phone && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.phone}
                  </FormHelperText>
                )}
              </FormControl>

              <Stack direction='row'>
                <Box width='100%'>

                </Box>
                <Box width='100%' display='flex' flexDirection='row' alignItems='end' >
                  <div style={{width:'50%'}}></div>
                    <Button variant='text' size='small' sx={{width:'50%',marginBlock:'3px'}} onClick={()=>handleStateChange('Otp')}>Send Otp</Button>
                </Box>
              </Stack>

              <FormControl  fullWidth error={Boolean(touched.otp && errors.otp)} sx={{marginBottom:'30px',display:otpState.mobile}}>
                <TextField
                  error={errors.otp&&touched.otp}
                  id="outlined-error"
                  type='text'
                  size='small'
                  value={values.otp}
                  name="otp"
                  label="Otp"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}

                  inputProps={{}}
                />
                {touched.otp && errors.otp && (
                  <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.otp}
                  </FormHelperText>
                )}
              </FormControl>
              
              <FormControl fullWidth error={Boolean(touched.email && errors.email)} >
                {/* <InputLabel htmlFor="outlined-adornment-password-register">Email</InputLabel> */}
                <TextField
                error={errors.email&&touched.email}
                id="outlined-error"
                  type='email'
                  value={values.email}
                  name="email"
                  size='small'
                  label="Email"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}

                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <Stack direction='row'>
                <Box width={{xl:'100%',xs:'30%'}}>

                </Box>
                <Box width={{xl:'100%',xs:'70%'}} display='flex' flexDirection='row' alignItems='end' >
                  <div style={{width:'50%'}}></div>
                    <Button variant='text' size='small' sx={{width:'50%',marginBlock:'3px'}} onClick={()=>handleStateChange('email')}>Send Code</Button>
                </Box>
              </Stack>

              <FormControl fullWidth error={Boolean(touched.code && errors.code)} sx={{display:otpState.email}}>
                <TextField
                  error={errors.code&&touched.code}
                  id="outlined-error"
                  type='text'
                  value={values.code}
                  name="code"
                  size='small'
                  label="code"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    
                  }}

                  inputProps={{}}
                />
                {touched.code && errors.code && (
                  <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.code}
                  </FormHelperText>
                )}
              </FormControl>

            
            {/* {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )} */}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
