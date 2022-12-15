import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    {
        label: 'Welcome',
    },
    {
        label: 'Connect your Shopify store',
    },
    {
        label: 'Connect your customer support email',
    },
    {
        label: 'Done',
    }
];

const LoginStepper = (props: { step: number }) => {

    return (
        <Box sx={{ maxWidth: 400 }} className="login-stepper">
            <Stepper activeStep={props.step} orientation="vertical">
                {steps.map((item) => (
                    <Step key={item.label}>
                        <StepLabel className="stepper-label">
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}

export default LoginStepper;