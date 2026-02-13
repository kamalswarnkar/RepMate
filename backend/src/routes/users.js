import { Router } from "express";
import { z } from "zod";
import prisma from "../utils/prisma.js";
import auth from "../middleware/auth.js";

const router = Router();

const updateSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

router.get("/me", auth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.sub } });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role });
  } catch (err) {
    return next(err);
  }
});

router.put("/me", auth, async (req, res, next) => {
  try {
    const data = updateSchema.parse(req.body);
    const updated = await prisma.user.update({
      where: { id: req.user.sub },
      data,
    });
    return res.json({ id: updated.id, email: updated.email, name: updated.name, phone: updated.phone, role: updated.role });
  } catch (err) {
    return next(err);
  }
});

export default router;
