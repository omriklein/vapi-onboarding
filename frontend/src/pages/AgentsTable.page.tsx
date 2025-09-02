import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllAgents } from "../services/agent.service";
import type { AgentDetails } from "../Components/AgentSetupForm";

const AgentTablePage = () => {

    const [agents, setAgents] = useState<AgentDetails[]>([]);
    useEffect(() => {
        getAllAgents().then((allAgents) => setAgents(allAgents));
    }, []);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Greeting message</TableCell>
                        <TableCell>VAPI assistant id</TableCell>
                        <TableCell>User name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {agents.map((agent) => (
                        <TableRow key={agent.id || agent.name}>
                            <TableCell>{agent.id}</TableCell>
                            <TableCell>{agent.name}</TableCell>
                            <TableCell>{agent.greetingMsg}</TableCell>
                            <TableCell>{agent.vapiAgentId || "No valid VAPI assistant"}</TableCell>
                            <TableCell>{agent.user?.name || "User not found"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AgentTablePage;