import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Servir les images statiques (créez un dossier 'public' dans server et mettez vos images dedans)
app.use('/images', express.static(path.join(__dirname, 'public')));

// Fonction pour lire les données depuis le fichier JSON
const getArtisansData = () => {
    try {
        // Assurez-vous d'avoir copié vos données dans server/artisans.json
        const dataPath = path.join(__dirname, 'artisans.json');
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Erreur lecture données:", err);
        return [];
    }
};

// Route : Liste de tous les artisans
app.get('/api/artisans', (req, res) => {
    const artisans = getArtisansData();
    res.json(artisans);
});

// Route : Détail d'un artisan
app.get('/api/artisans/:id', (req, res) => {
    const artisans = getArtisansData();
    const id = req.params.id;
    // Recherche flexible (string ou number)
    const artisan = artisans.find(a => String(a.id_artisan) === id || String(a.id) === id);
    
    if (artisan) res.json(artisan);
    else res.status(404).json({ message: "Artisan non trouvé" });
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
