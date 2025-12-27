import express from "express";
import {
  getAllArtisans,
  getArtisanById,
  getArtisansByCategorie,
  searchArtisans
} from "../controllers/artisan.controller.js";

const router = express.Router();

// Route de base : /api/artisans

// Récupérer tous les artisans
router.get("/", getAllArtisans);

// Rechercher (doit être avant /:id pour ne pas être interprété comme un ID)
router.get("/search", searchArtisans);

// Filtrer par catégorie
router.get("/categorie/:id", getArtisansByCategorie);

// Récupérer un artisan par son ID
router.get("/:id", getArtisanById);

export default router;
