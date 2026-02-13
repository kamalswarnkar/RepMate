import { Router } from "express";
import { z } from "zod";
import prisma from "../utils/prisma.js";
import auth from "../middleware/auth.js";

const router = Router();

const profileSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  age: z.number().int().positive().optional(),
  gender: z.string().optional(),
  heightCm: z.number().int().positive().optional(),
  weightKg: z.number().int().positive().optional(),
  diet: z.string().optional(),
  medical: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  fitnessLevel: z.string().optional(),
});

router.get("/me", auth, async (req, res, next) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.sub },
    });
    return res.json(profile || {});
  } catch (err) {
    return next(err);
  }
});

router.put("/me", auth, async (req, res, next) => {
  try {
    const data = profileSchema.parse(req.body);
    const updated = await prisma.profile.upsert({
      where: { userId: req.user.sub },
      update: data,
      create: { userId: req.user.sub, ...data },
    });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

export default router;
