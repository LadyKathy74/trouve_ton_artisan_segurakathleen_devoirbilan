import Specialite from "../models/specialite.model.js";
import Categorie from "../models/categorie.model.js";
import Artisan from "../models/artisan.model.js";

export const getAllSpecialites = async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      include: Categorie,
      order: [['nom_specialite', 'ASC']] // Tri alphabétique pour l'affichage
    });
    res.json(specialites);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getSpecialiteById = async (req, res) => {
  try {
    const specialite = await Specialite.findByPk(req.params.id, {
      include: [
        Categorie,
        { model: Artisan }
      ]
    });

    if (!specialite) return res.status(404).json({ error: "Spécialité introuvable" });

    res.json(specialite);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
