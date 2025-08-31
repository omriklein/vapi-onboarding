import axios from "axios";

const API_URL = process.env.API_URL;

export const getReport = async (hours: number) => {
    console.log(`${API_URL}/reports/users?hours=${hours}`);
    const { data } = await axios.get(`${API_URL}/reports/users?hours=${hours}`);
    return data;
};