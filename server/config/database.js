import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "trouve_ton_artisan",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD ?? "password", // Utilisation de ?? pour permettre un mot de passe vide
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false
  }
);

export default sequelize;
