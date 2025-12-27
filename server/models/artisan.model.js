import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Specialite from "./specialite.model.js";

const Artisan = sequelize.define("artisan", {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: DataTypes.STRING, // Ajout du champ image requis par le frontend
  note: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  ville: DataTypes.STRING,
  a_propos: DataTypes.TEXT,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  site_web: DataTypes.STRING,
});

Specialite.hasMany(Artisan, { onDelete: "CASCADE" });
Artisan.belongsTo(Specialite);

export default Artisan;
