import jwt from "jsonwebtoken";
import crypto from "crypto";

const accessTtlMin = Number(process.env.JWT_ACCESS_TTL_MIN || 15);
const refreshTtlDays = Number(process.env.JWT_REFRESH_TTL_DAYS || 30);

export function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: `${accessTtlMin}m`,
  });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: `${refreshTtlDays}d`,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function getRefreshExpiryDate() {
  const expires = new Date();
  expires.setDate(expires.getDate() + refreshTtlDays);
  return expires;
}
