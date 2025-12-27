import express from "express";
import { sendContactEmail } from "../controllers/contact.controller.js";

const router = express.Router();

// Route de base : /api/contact

// Envoyer un message de contact
router.post("/", sendContactEmail);

export default router;
