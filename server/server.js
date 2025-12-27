import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Base de données
import sequelize from './config/database.js';

// Routes
import artisanRoutes from './routes/artisan.routes.js';
import categoryRoutes from './routes/categorie.routes.js';
import specialtyRoutes from './routes/specialite.routes.js';
import contactRoutes from './routes/contact.routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Middleware de log pour vérifier que les requêtes arrivent bien
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Servir les fichiers statiques (images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes API
app.use("/api/artisans", artisanRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/specialites", specialtyRoutes);
app.use("/api/contact", contactRoutes);

// Middleware global d’erreurs
app.use((err, req, res, next) => {
  console.error("Erreur détectée :", err);
  res.status(500).json({ error: err.message, sqlMessage: err.sqlMessage });
});

const PORT = process.env.PORT || 3002;

// Démarrage du serveur avec vérification de la BDD
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
};

startServer();
