import { useState, type ReactElement } from "react";
import { Box, Stepper, Step, StepLabel, Container, Button } from "@mui/material";
import { validateAgentForm, validateSignupForm } from "../utils/formValidation";
import SignUpForm, { type UserDetails } from "../Components/SignUpForm";
import AgentSetupForm, { type AgentDetails } from "../Components/AgentSetupForm";
import Summery from "../Components/Summery";

type Step = { name: string, component: ReactElement, completed: boolean };

export const OnboardingStepper = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const [data, setData] = useState<{ signUp: UserDetails, agentSetup: AgentDetails }>({
        signUp: { name: "", email: "", phone: "", service: "" },
        agentSetup: { name: "", greetingMsg: "" }
    });

    const validateNoErrors = (validator: any): boolean => {
        return Object.keys(validator).length === 0;
    }

    const steps = [
        {
            name: "Sign Up",
            component:
                <SignUpForm value={data.signUp} onChange={value => setData((prev) => ({ ...prev, signUp: value }))} />,
            completed: validateNoErrors(validateSignupForm(data.signUp))
        },
        {
            name: "Agent Setup",
            component:
                <AgentSetupForm value={data.agentSetup} onChange={value => setData((prev) => ({ ...prev, agentSetup: value }))} />,
            completed: validateNoErrors(validateAgentForm(data.agentSetup))
        },
        {
            name: "Summary",
            component: <Summery userDetails={data.signUp} agentDetails={data.agentSetup} />,
            completed: true
        }
    ];


    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((step) => (
                        <Step key={step.name}>
                            <StepLabel>{step.name}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box mt={4}>
                    {steps[activeStep].component}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant="contained" onClick={handleNext} disabled={!steps[activeStep].completed}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </Container>
    );
};
