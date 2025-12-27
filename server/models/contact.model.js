import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Contact = sequelize.define("contact", {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 255] // Validation de la longueur (min 2)
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  objet: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255] // Validation de la longueur (min 3)
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [10, 2000] // Validation de la longueur (min 10)
    }
  },
  artisanEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  }
});

export default Contact;
