import express from 'express';
import dotenv from 'dotenv';
import User from "./models/user";

import agentRoutes from './routes/agent';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('VAPI Onboarding Backend Running');
});

app.use("/users", userRoutes);
app.use("/agents", agentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));