import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import type { UserDetails } from "./SignUpForm";
import type { AgentDetails } from "./AgentSetupForm";

interface SummeryProps {
    userDetails: UserDetails,
    agentDetails: AgentDetails,
}

const Summary = ({ userDetails, agentDetails }: SummeryProps) => {

    return (
        <Box>
            <Typography variant="h5" mb={3}>
                Summary
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Name" secondary={userDetails.name} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Service" secondary={userDetails.service} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Phone" secondary={userDetails.phone} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Email" secondary={userDetails.email} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Agent Name" secondary={agentDetails.name} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Greeting" secondary={agentDetails.greetingMsg} />
                </ListItem>
            </List>
        </Box>
    );
};

export default Summary;