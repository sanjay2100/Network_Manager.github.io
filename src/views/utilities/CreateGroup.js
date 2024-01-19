import React from 'react';
import SubCard from 'ui-component/cards/SubCard';
import { Grid, TextField, Button, Snackbar   } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateGroup() {
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
        <Grid item xl={4} sx={{ display: 'flex', verticalAlign: 'center' }} mb={2}>
          <TextField id="outlined-basic" label="Group name" variant="outlined" fullWidth />
        </Grid>
        <Grid container xl={12}>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%'
            }}
          >
            <TextField fullWidth label="Group decription" id="fullWidth" />
          </Box>
        </Grid>

        <Grid container xl={12} justifyContent="flex-end">
          <Grid item xl={2} mt={1}>
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
