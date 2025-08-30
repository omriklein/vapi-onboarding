import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { validateAgentForm } from "../utils/formValidation";

// TODO: move to another page
export type AgentDetails = {
    name: string,
    greetingMsg: string,
};

interface AgentSetupFormProps {
    value: AgentDetails;
    onChange: (value: AgentDetails) => void;
}

const AgentSetupForm = ({ value: form, onChange: setForm }: AgentSetupFormProps) => {
    const [formErrors, setFromErrors] = useState<Record<string, string>>({});

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFormData = { ...form, [event.target.name]: event.target.value };
        setForm(newFormData);
        const newFormErrors = validateAgentForm(newFormData);
        setFromErrors(newFormErrors);
    };

    return (
        <Box sx={{ p: "2em" }}>
            <Typography variant="h1" gutterBottom>Agent Setup</Typography>
            <Typography variant="subtitle1" gutterBottom>Setup your call agent</Typography>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    value={form.name}
                    onChange={handleFormChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                />
                <TextField
                    fullWidth
                    name="greetingMsg"
                    label="Greeting Message"
                    value={form.greetingMsg}
                    onChange={handleFormChange}
                    error={!!formErrors.service}
                    helperText={formErrors.service}
                />
            </Stack>
            {/* <Button variant="contained" fullWidth onClick={submitForm} disabled={HasErrors} sx={{ mt: 3 }}>
                Setup Agent
            </Button> */}
        </Box>
    );
};

export default AgentSetupForm;