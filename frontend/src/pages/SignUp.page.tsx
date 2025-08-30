import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { validateForm } from "../utils/formValidation";

export type UserDetails = {
    name: string,
    service: string,
    phone: string,
    email: string
};

const SignUpPage = () => {
    const [form, setForm] = useState<UserDetails>({
        name: "",
        service: "",
        phone: "",
        email: "",
    });
    const [formErrors, setFromErrors] = useState<Record<string, string>>({});
    const HasErrors = Object.keys(formErrors).length !== 0;

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFormData = { ...form, [event.target.name]: event.target.value };
        setForm(newFormData);
        setFromErrors(validateForm(newFormData));
    };

    const submitForm = () => {
        // save data
        // navigate to next page
        alert(`Sign up completed! for now...`);
    };

    return (
       <Box sx={{ p: "2em" }}>
            <Typography variant="h1" gutterBottom>Sign Up</Typography>
            <Typography variant="subtitle1" gutterBottom>secondary text here?</Typography>
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
            <Button variant="contained" fullWidth onClick={submitForm} disabled={HasErrors} sx={{ mt: 3 }}>
                Sign Up
            </Button>
        </Box>
    );
};

export default SignUpPage;