import request from 'supertest';
import express from 'express';
import artisanRoutes from '../routes/artisan.routes.js';
import { Artisan } from '../models/index.js';
import * as artisanController from '../controllers/artisan.controller.js';

// --- 1. Mocks des dépendances ---

// Mock du modèle Sequelize (Base de données)
jest.mock('../models/index.js', () => ({
  Artisan: {
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

// Mock des contrôleurs existants (pour les routes GET)
jest.mock('../controllers/artisan.controller.js', () => ({
  getAllArtisans: jest.fn((req, res) => res.status(200).json([{ id: 1, nom: 'Test' }])),
  getArtisanById: jest.fn((req, res) => res.status(200).json({ id: 1, nom: 'Test' })),
  getArtisansByCategorie: jest.fn((req, res) => res.status(200).json([])),
  searchArtisans: jest.fn((req, res) => res.status(200).json([])),
}));

// Mock de Multer (Upload de fichiers)
// On remplace le middleware par une fonction qui passe simplement à la suite (next)
jest.mock('multer', () => {
  const multer = () => ({
    single: () => (req, res, next) => {
      req.file = { filename: 'test-image.jpg' }; // Simulation d'un fichier uploadé
      next();
    },
  });
  multer.diskStorage = () => {};
  return multer;
});

// --- 2. Configuration de l'application Express pour le test ---
const app = express();
app.use(express.json()); // Pour parser le JSON entrant
app.use('/api/artisans', artisanRoutes);

// --- 3. Les Tests ---
describe('Routes API Artisans', () => {
  
  // Nettoyer les mocks après chaque test pour éviter les interférences
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/artisans', () => {
    it('devrait déléguer au contrôleur getAllArtisans', async () => {
      await request(app).get('/api/artisans');
      expect(artisanController.getAllArtisans).toHaveBeenCalled();
    });
  });

  describe('POST /api/artisans', () => {
    it('devrait créer un artisan et retourner 201', async () => {
      const mockArtisan = { id: 1, nom: 'Nouvel Artisan', image: 'test-image.jpg' };
      Artisan.create.mockResolvedValue(mockArtisan);

      const res = await request(app)
        .post('/api/artisans')
        .send({ nom: 'Nouvel Artisan' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockArtisan);
      expect(Artisan.create).toHaveBeenCalled();
    });

    it('devrait retourner 400 si la création échoue', async () => {
      Artisan.create.mockRejectedValue(new Error('Erreur DB'));

      const res = await request(app)
        .post('/api/artisans')
        .send({ nom: 'Erreur' });

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/artisans/:id', () => {
    it('devrait mettre à jour un artisan existant', async () => {
      // On simule un artisan trouvé qui a une méthode update
      const mockArtisanInstance = {
        update: jest.fn().mockResolvedValue(true),
        toJSON: () => ({ id: 1, nom: 'Artisan Modifié' }) // Pour le res.json
      };
      Artisan.findByPk.mockResolvedValue(mockArtisanInstance);

      const res = await request(app)
        .put('/api/artisans/1')
        .send({ nom: 'Artisan Modifié' });

      expect(res.status).toBe(200);
      expect(Artisan.findByPk).toHaveBeenCalledWith('1');
      expect(mockArtisanInstance.update).toHaveBeenCalled();
    });

    it('devrait retourner 404 si l\'artisan n\'existe pas', async () => {
      Artisan.findByPk.mockResolvedValue(null);

      const res = await request(app).put('/api/artisans/999').send({});
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/artisans/:id', () => {
    it('devrait supprimer un artisan existant', async () => {
      const mockArtisanInstance = {
        destroy: jest.fn().mockResolvedValue(true),
      };
      Artisan.findByPk.mockResolvedValue(mockArtisanInstance);

      const res = await request(app).delete('/api/artisans/1');

      expect(res.status).toBe(200);
      expect(mockArtisanInstance.destroy).toHaveBeenCalled();
    });
  });
});