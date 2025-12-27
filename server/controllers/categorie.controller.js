import Categorie from "../models/categorie.model.js";
import Specialite from "../models/specialite.model.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      order: [['nom_categorie', 'ASC']] // Tri alphabétique pour l'affichage
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id, {
      include: Specialite
    });

    if (!categorie) return res.status(404).json({ error: "Catégorie introuvable" });

    res.json(categorie);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
