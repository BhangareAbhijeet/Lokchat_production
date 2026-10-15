const express = require("express");
const cors = require("cors");

const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LokChat API is running",
  });
});

// Register application routes above these handlers.

// Handle unknown routes
app.use(notFoundHandler);

// Centralized error handler must be last.
app.use(errorHandler);

module.exports = app;