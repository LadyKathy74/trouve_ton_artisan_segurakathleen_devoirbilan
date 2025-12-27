import express from "express";
import { getAllSpecialites, getSpecialiteById } from "../controllers/specialite.controller.js";

const router = express.Router();

// Route de base : /api/specialites

// Récupérer toutes les spécialités
router.get("/", getAllSpecialites);

// Récupérer une spécialité par son ID (inclut les artisans)
router.get("/:id", getSpecialiteById);

export default router;
