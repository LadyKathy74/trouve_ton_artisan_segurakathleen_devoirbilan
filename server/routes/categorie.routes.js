import express from "express";
import { getAllCategories, getCategoryById } from "../controllers/categorie.controller.js";

const router = express.Router();

// Route de base : /api/categories

// Récupérer toutes les catégories
router.get("/", getAllCategories);

// Récupérer une catégorie par son ID (inclut les spécialités)
router.get("/:id", getCategoryById);

export default router;
