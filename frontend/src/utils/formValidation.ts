import type { UserDetails } from "../pages/SignUp.page";

export const validateForm = (form: UserDetails): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.service) errors.service = "Service is required";
    if (!form.phone) errors.phone = "Phone is required";
    if (!form.email) errors.email = "Email is required";
    return errors;
};