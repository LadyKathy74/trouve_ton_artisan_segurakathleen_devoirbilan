import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Categorie = sequelize.define("categorie", {
  nom_categorie: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Categorie;
