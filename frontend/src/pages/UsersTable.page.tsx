import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { UserDetails } from "../Components/SignUpForm";
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/user.service";

const UserTablePage = () => {

    const [users, setUsers] = useState<UserDetails[]>([]);
    useEffect(() => {

        getAllUsers().then((allUsers) => setUsers(allUsers));

    }, []);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id || user.email}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.service}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTablePage;