import { Router } from "express";
import Agent from "../models/agent";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, greetingMsg, userId } = req.body;
    const agent = await Agent.create({ name, greetingMsg, userId });
    res.status(201).json(agent);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
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

export default router;
