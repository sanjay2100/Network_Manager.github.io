import React,{useState} from 'react'
import { Box, Button, Grid, Step, StepButton, Stepper, Typography } from '@mui/material'
import AuthWrapper1 from '../AuthWrapper1';
import SignUp from './SignUp'
import SignIn from './SignIn'
import Address from './Address';
import KycRegister from './KycRegister';
import SecurityQues from './SecurityQues';


const Index = () => {
    const steps = ['', '', '', '', ''];

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const totalSteps = () => {  
        return steps.length;
      };
    
      const completedSteps = () => {
        return Object.keys(completed).length;
      };
      
    //   const isLastStep = () => {
    //     return activeStep === totalSteps() - 1;
    //   };
    
      const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
      };
    
    //   const handleNext = () => {
    //     const newActiveStep =
    //       isLastStep() && !allStepsCompleted()
    //         ? // It's the last step, but not all steps have been completed,
    //           // find the first step that has been completed
    //           steps.findIndex((step, i) => !(i in completed))
    //         : activeStep + 1;
    //     setActiveStep(newActiveStep);
    //   };
    
    //   const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    //   };
    
      const handleStep = (step) => () => {
        setActiveStep(step);
      };
    
    //   const handleComplete = () => {
    //     const newCompleted = completed;
    //     newCompleted[activeStep] = true;
    //     setCompleted(newCompleted);
    //     handleNext();
    //   };
    
      const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
      };

  return (
    <>
       <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '50vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
       {/* stepper */}
       <Box sx={{ width: '100%' }}>
       <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} >
            <StepButton color="success" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      </Box>
      {/* stepper end */}
             
            <>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
          {activeStep==0?<SignUp/>:activeStep==1?<Address/>:activeStep==2?<KycRegister/>:activeStep==3?<SignIn/>:<SecurityQues/>}

{/*             
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box> */}
          </>
        )}
      </>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
    </>
  )
}

export default Index