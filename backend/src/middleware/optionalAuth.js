import { verifyAccessToken } from "../utils/tokens.js";

export default function optionalAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next();
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
  } catch {
    // ignore invalid token for optional auth
  }
  return next();
}
