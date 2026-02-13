import { Router } from "express";
import { z } from "zod";
import prisma from "../utils/prisma.js";
import auth from "../middleware/auth.js";
import optionalAuth from "../middleware/optionalAuth.js";

const router = Router();

const messageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  department: z.string().optional(),
  message: z.string().min(1),
});

router.post("/", optionalAuth, async (req, res, next) => {
  try {
    const data = messageSchema.parse(req.body);
    const userId = req.user?.sub || null;
    const created = await prisma.contactMessage.create({
      data: {
        userId,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        department: data.department || null,
        message: data.message,
      },
    });
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
});

router.get("/", auth, async (req, res, next) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      where: { userId: req.user.sub },
      orderBy: { createdAt: "desc" },
    });
    return res.json(messages);
  } catch (err) {
    return next(err);
  }
});

export default router;
