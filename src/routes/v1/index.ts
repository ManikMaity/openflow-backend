import express from "express";
import { healthCheck } from "./health";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json({ message: "API is working" });
});

router.get("/health", healthCheck);

export default router;
