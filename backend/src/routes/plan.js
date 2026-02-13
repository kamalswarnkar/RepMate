import { Router } from "express";
import { z } from "zod";
import prisma from "../utils/prisma.js";
import auth from "../middleware/auth.js";

const router = Router();

const planSchema = z.object({
  place: z.string().optional(),
  data: z.any(),
});

router.get("/", auth, async (req, res, next) => {
  try {
    const plan = await prisma.plan.findFirst({
      where: { userId: req.user.sub },
      orderBy: { updatedAt: "desc" },
    });
    return res.json(plan || {});
  } catch (err) {
    return next(err);
  }
});

router.put("/", auth, async (req, res, next) => {
  try {
    const data = planSchema.parse(req.body);
    await prisma.plan.deleteMany({ where: { userId: req.user.sub } });
    const created = await prisma.plan.create({
      data: {
        userId: req.user.sub,
        place: data.place || null,
        data: data.data,
      },
    });
    return res.json(created);
  } catch (err) {
    return next(err);
  }
});

export default router;
