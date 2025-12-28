// c:\Users\kathl\Desktop\trouve_ton_artisan_segurakathleen_devoirbilan\server\seed.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement (.env)
dotenv.config();

// --- 1. Configuration de la Base de Données ---
// (On reprend la même config que server.js)
const sequelize = new Sequelize(
    process.env.DB_NAME || 'trouve_ton_artisan_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

// --- 2. Définition du Modèle ---
// (On reprend la même définition que server.js pour être cohérent)
const Artisan = sequelize.define('Artisan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    specialty: { type: DataTypes.STRING },
    rating: { type: DataTypes.FLOAT },
    location: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    email: { type: DataTypes.STRING },
    website: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING }
}, {
    tableName: 'artisans',
    timestamps: false
});

// --- 3. Script d'importation ---
const seedDatabase = async () => {
    try {
        // Connexion
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie.');

        // Synchronisation : force: true permet de supprimer la table si elle existe et de la recréer à neuf
        await sequelize.sync({ force: true });
        console.log('Table "artisans" réinitialisée.');

        // Lecture du fichier JSON (situé dans le même dossier server)
        const jsonPath = path.join(__dirname, 'artisans.json');
        
        if (!fs.existsSync(jsonPath)) {
            throw new Error(`Fichier introuvable : ${jsonPath}`);
        }

        const rawData = fs.readFileSync(jsonPath, 'utf-8');
        const artisansData = JSON.parse(rawData);

        // Préparation des données (mapping)
        const artisansToInsert = artisansData.map(artisan => ({
            name: artisan.name,
            specialty: artisan.specialty,
            rating: artisan.rating,
            location: artisan.location,
            description: artisan.description,
            email: artisan.email,
            website: artisan.website,
            category: artisan.category,
            image: artisan.image
        }));

        // Insertion en masse
        await Artisan.bulkCreate(artisansToInsert);
        console.log(`${artisansToInsert.length} artisans ont été importés avec succès !`);

    } catch (error) {
        console.error('Erreur lors du seeding :', error);
    } finally {
        // Fermeture de la connexion
        await sequelize.close();
    }
};
