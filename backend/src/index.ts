import express from 'express';
import dotenv from 'dotenv';
import User from "./models/User";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('VAPI Onboarding Backend Running');
});

// Create user
app.post("/users", async (req, res) => {
  console.log(`request data`, req.body)
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
app.get("/users", async (_, res) => {
  console.log(`getting all users`)
  const users = await User.findAll();
  res.json(users);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));