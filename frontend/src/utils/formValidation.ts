import type { AgentDetails } from "../Components/AgentSetupForm";
import type { UserDetails } from "../Components/SignUpForm";

export const validateSignupForm = (form: UserDetails): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.service) errors.service = "Service is required";
    if (!form.phone) errors.phone = "Phone is required";
    if (!form.email) errors.email = "Email is required";
    return errors;
};

export const validateAgentForm = (form: AgentDetails): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.greetingMsg) errors.service = "Service is required";
    return errors;
};