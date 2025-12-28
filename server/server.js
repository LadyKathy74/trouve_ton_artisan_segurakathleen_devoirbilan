import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());

// Servir les images statiques (créez un dossier 'public' dans server et mettez vos images dedans)
app.use('/images', express.static(path.join(__dirname, 'public')));

// --- Configuration de l'Upload (Multer) ---
const uploadDir = path.join(__dirname, 'public');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // On garde le nom d'origine ou on ajoute un timestamp pour éviter les doublons
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'));
    }
});
const upload = multer({ storage: storage });

// --- Configuration de la Base de Données (Sequelize) ---

const sequelize = new Sequelize(
    process.env.DB_NAME || 'trouve_ton_artisan_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false // Mettre à true pour voir les requêtes SQL dans la console
    }
);

// Définition du Modèle Artisan
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
    tableName: 'artisans', // Nom de la table dans MySQL
    timestamps: false      // Pas de champs createdAt/updatedAt pour simplifier
});

// Synchronisation avec la base de données
sequelize.sync()
    .then(() => console.log('Base de données synchronisée.'))
    .catch(err => console.error('Erreur de synchronisation DB:', err));

// --- Routes API ---

// Route : Liste de tous les artisans
app.get('/api/artisans', async (req, res) => {
    try {
        const artisans = await Artisan.findAll();
        res.json(artisans);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

// Route : Détail d'un artisan
app.get('/api/artisans/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const artisan = await Artisan.findByPk(id);
        
        if (artisan) res.json(artisan);
        else res.status(404).json({ message: "Artisan non trouvé" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

// Route : Créer un artisan
app.post('/api/artisans', upload.single('image'), async (req, res) => {
    try {
        const artisanData = { ...req.body };
        // Si un fichier est uploadé, on utilise son nom, sinon on garde ce qui est envoyé (ou rien)
        if (req.file) {
            artisanData.image = req.file.filename;
        }
        const newArtisan = await Artisan.create(artisanData);
        res.status(201).json(newArtisan);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création", error });
    }
});

// Route : Modifier un artisan
app.put('/api/artisans/:id', upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id;
        const artisanData = { ...req.body };
        if (req.file) {
            artisanData.image = req.file.filename;
        }
        const [updated] = await Artisan.update(artisanData, { where: { id: id } });
        if (updated) {
            const updatedArtisan = await Artisan.findByPk(id);
            res.json(updatedArtisan);
        } else {
            res.status(404).json({ message: "Artisan non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification", error });
    }
});

// Route : Supprimer un artisan
app.delete('/api/artisans/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Artisan.destroy({ where: { id: id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Artisan non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error });
    }
});

// Route : Formulaire de contact (Simulation)
app.post('/api/contact', (req, res) => {
    const { nom, email, objet, message } = req.body;
    console.log(`[CONTACT] Nouveau message de ${nom} (${email})`);
    console.log(`Objet: ${objet}\nMessage: ${message}`);
    
    // Simulation d'un envoi réussi
    res.status(200).json({ success: true, message: "Message reçu par le serveur" });
});

app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
