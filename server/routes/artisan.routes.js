import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllArtisans,
  getArtisanById,
  getArtisansByCategorie,
  searchArtisans
} from "../controllers/artisan.controller.js";
// Assurez-vous d'importer votre modèle Artisan ici. 
// Le chemin peut varier selon votre structure (ex: "../models/index.js" ou "../models/artisan.model.js")
import { Artisan } from "../models/index.js"; 

const router = express.Router();

// Configuration de Multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Assurez-vous que ce dossier existe à la racine du serveur
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Route de base : /api/artisans

// Récupérer tous les artisans
router.get("/", getAllArtisans);

// Rechercher (doit être avant /:id pour ne pas être interprété comme un ID)
router.get("/search", searchArtisans);

// Filtrer par catégorie
router.get("/categorie/:id", getArtisansByCategorie);

// Récupérer un artisan par son ID
router.get("/:id", getArtisanById);

// POST : ajouter un artisan
router.post('/', upload.single("image"), async (req, res) => {
  try {
    const artisanData = req.body;
    if (req.file) {
      artisanData.image = req.file.filename;
    }
    const artisan = await Artisan.create(artisanData);
    res.status(201).json(artisan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT : modifier un artisan
router.put('/:id', upload.single("image"), async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });
    
    const artisanData = req.body;
    if (req.file) {
      artisanData.image = req.file.filename;
    }
    
    await artisan.update(artisanData);
    res.json(artisan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE : supprimer un artisan
router.delete('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });
    await artisan.destroy();
    res.json({ message: 'Artisan supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
