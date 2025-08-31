import { Router, Request, Response } from "express";
import Agent from "../models/agent";
import sequelize from "../sequelize";
import User from "../models/user";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, greetingMsg, userId } = req.body;
    const agent = await Agent.create({ name, greetingMsg, userId });
    res.status(201).json(agent);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const agents = await Agent.findAll({ include: ["user"] });
    res.json(agents);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const agent = await Agent.findByPk(req.params.id, { include: ["user"] });
    if (!agent) return res.status(404).json({ error: "Agent not found" });
    res.json(agent);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/create-user-agent", async (req: Request, res: Response) => {
  const { userData, agentData } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // 1. Create user
    const user = await User.create(userData, { transaction });

    // 2. Create agent linked to this user
    const agent = await Agent.create(
      { ...agentData, userId: user.id },
      { transaction }
    );

    // 3. Commit transaction
    await transaction.commit();

    res.status(201).json({
      message: "User and Agent created successfully",
      user,
      agent,
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: "Failed to create User + Agent", error });
  }
});

export default router;
