import { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { validateSignupForm } from "../utils/formValidation";

// TODO: move to another page
export type UserDetails = {
    id?: string,
    name: string,
    service: string,
    phone: string,
    email: string
};

interface SignUpFormProps {
    value: UserDetails;
    onChange: (value: UserDetails) => void;
}

const SignUpForm = ({ value: form, onChange: setForm }: SignUpFormProps) => {
    const [formErrors, setFromErrors] = useState<Record<string, string>>({});

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFormData = { ...form, [event.target.name]: event.target.value };
        setForm(newFormData);
        const newFormErrors = validateSignupForm(newFormData)
        setFromErrors(newFormErrors);
    };

    return (
       <Box sx={{ p: "2em" }}>
            <Typography variant="h1" gutterBottom>Sign Up</Typography>
            <Typography variant="subtitle1" gutterBottom>Please enter your personal information</Typography>
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
                    name="service"
                    label="Service"
                    value={form.service}
                    onChange={handleFormChange}
                    error={!!formErrors.service}
                    helperText={formErrors.service}
                />
                <TextField
                    fullWidth
                    name="phone"
                    label="Phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                />
                <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={form.email}
                    onChange={handleFormChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                />
            </Stack>
        </Box>
    );
};

export default SignUpForm;