export default function errorHandler(err, req, res, next) {
  if (err.name === "ZodError") {
    return res.status(400).json({ error: "Validation failed", details: err.errors });
  }
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV !== "production") {
    return res.status(status).json({ error: message, details: err.details || null });
  }
  return res.status(status).json({ error: message });
}
