import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Categorie from "./categorie.model.js";

const Specialite = sequelize.define("specialite", {
  nom_specialite: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

Categorie.hasMany(Specialite, { onDelete: "CASCADE" });
Specialite.belongsTo(Categorie);

export default Specialite;
