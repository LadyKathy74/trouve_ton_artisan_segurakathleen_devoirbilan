import Artisan from "../models/artisan.model.js";
import Specialite from "../models/specialite.model.js";
import Categorie from "../models/categorie.model.js";
import { Op } from "sequelize";

export const getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: { model: Specialite, include: Categorie }
    });
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: { model: Specialite, include: Categorie }
    });

    if (!artisan) return res.status(404).json({ error: "Artisan introuvable" });

    res.json(artisan);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getArtisansByCategorie = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        include: {
          model: Categorie,
          where: { id: req.params.id }
        }
      }
    });

    res.json(artisans);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const searchArtisans = async (req, res) => {
  try {
    const { q } = req.query;

    const artisans = await Artisan.findAll({
      where: {
        nom: { [Op.like]: `%${q}%` }
      },
      include: { model: Specialite, include: Categorie }
    });

    res.json(artisans);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
