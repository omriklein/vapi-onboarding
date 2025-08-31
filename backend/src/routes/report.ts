import { Request, Response, Router } from "express";
import User from "../models/user";
import { Op } from "sequelize";

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
  const hours = parseInt(req.query.hours as string) || 24;
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  const users = await User.findAll({
    where: { createdAt: { [Op.gte]: since } },
  });

  res.json(users);
});

export default router;
