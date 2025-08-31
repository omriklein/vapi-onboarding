import type { AgentDetails } from "../Components/AgentSetupForm";
import type { UserDetails } from "../Components/SignUpForm";

const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const isValidPhoneNumber = (phone:string): boolean => {
  const regex = /^(0\d{8,9}|\+[1-9]\d{9,14})$/;
  return regex.test(phone);
}

export const validateSignupForm = (form: UserDetails): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.service) errors.service = "Service is required";
    if (!form.phone) errors.phone = "Phone is required";
    if (!form.email) errors.email = "Email is required";

    if(form.name && form.name.length < 2) errors.name = "Name must be at least 2 character long";
    if(form.service && form.service.length < 2) errors.service = "Name must be at least 2 character long";
    if(form.email && !isValidEmail(form.email)) errors.email = "Email is not in the correct format";
    if(form.phone && !isValidPhoneNumber(form.phone)) errors.phone = "Phone number is not in the correct format";

    return errors;
};

export const validateAgentForm = (form: AgentDetails): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.greetingMsg) errors.service = "Service is required";
    return errors;
};
