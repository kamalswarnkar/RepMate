import { Router } from "express";
import { z } from "zod";
import prisma from "../utils/prisma.js";
import auth from "../middleware/auth.js";

const router = Router();

const progressSchema = z.object({
  completedDays: z.array(z.number().int()).default([]),
  calories: z.string().optional(),
  timeline: z.string().optional(),
  totalWorkouts: z.number().int().optional(),
});

router.get("/", auth, async (req, res, next) => {
  try {
    const progress = await prisma.progress.findUnique({
      where: { userId: req.user.sub },
    });
    return res.json(progress || { completedDays: [] });
  } catch (err) {
    return next(err);
  }
});

router.put("/", auth, async (req, res, next) => {
  try {
    const data = progressSchema.parse(req.body);
    const updated = await prisma.progress.upsert({
      where: { userId: req.user.sub },
      update: data,
      create: {
        userId: req.user.sub,
        completedDays: data.completedDays || [],
        calories: data.calories || null,
        timeline: data.timeline || null,
        totalWorkouts: data.totalWorkouts || null,
      },
    });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

export default router;
