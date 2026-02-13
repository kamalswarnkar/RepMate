import { Router } from "express";
import { z } from "zod";
import prisma from "../utils/prisma.js";
import auth from "../middleware/auth.js";

const router = Router();

const goalsSchema = z.object({
  goals: z.array(z.string().min(1)).max(20),
});

router.get("/", auth, async (req, res, next) => {
  try {
    const goals = await prisma.goal.findMany({
      where: { userId: req.user.sub },
      orderBy: { createdAt: "asc" },
    });
    return res.json(goals.map((g) => g.name));
  } catch (err) {
    return next(err);
  }
});

router.put("/", auth, async (req, res, next) => {
  try {
    const data = goalsSchema.parse(req.body);
    await prisma.$transaction([
      prisma.goal.deleteMany({ where: { userId: req.user.sub } }),
      prisma.goal.createMany({
        data: data.goals.map((name) => ({ userId: req.user.sub, name })),
      }),
    ]);
    return res.json({ goals: data.goals });
  } catch (err) {
    return next(err);
  }
});

export default router;
