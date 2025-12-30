# Trouve ton Artisan

Bienvenue sur le dépôt du projet **Trouve ton Artisan**, une plateforme web de mise en relation entre les artisans de la région Auvergne-Rhône-Alpes et les particuliers.

## 📋 Description

Ce projet a pour objectif de valoriser l'artisanat local en offrant une interface simple, moderne et accessible pour rechercher des professionnels qualifiés. Il comprend une partie publique pour les utilisateurs et une interface d'administration sécurisée pour la gestion des données.

## ✨ Fonctionnalités

### Partie Publique (Utilisateurs)
- **Accueil dynamique** : Mise en avant des "Artisans du mois" (les mieux notés) et guide d'utilisation.
- **Recherche avancée** :
  - Filtrage par catégorie : Bâtiment, Services, Fabrication, Alimentation.
  - Barre de recherche globale (nom, ville, spécialité).
- **Fiches détaillées** : Informations complètes sur chaque artisan (note, spécialité, localisation, site web, description).
- **Accessibilité** : Respect des normes WCAG (navigation clavier, contrastes, balises ARIA).
- **Responsive Design** : Interface adaptée aux mobiles, tablettes et ordinateurs.

### Partie Administration (Privée)
- **Authentification** : Accès sécurisé à l'espace de gestion.
- **Tableau de bord** : Vue d'ensemble de la liste des artisans.
- **Gestion complète (CRUD)** :
  - **Ajouter** un nouvel artisan avec upload de photo.
  - **Modifier** les informations d'un artisan existant.
  - **Supprimer** un artisan de la base de données.
- **Outils de gestion** : Barre de recherche interne et pagination pour naviguer efficacement dans la liste.

## 🛠 Stack Technique

**Frontend :**
- React.js
- React Router (Navigation)
- SCSS (Architecture BEM, Variables, Mixins)

**Backend :**
- Node.js
- Express.js
- Multer (Gestion des uploads d'images)
- API RESTful

## 🚀 Installation et Lancement

### Prérequis
- Node.js installé sur votre machine.

### 1. Installation et lancement du Serveur (Backend)

```bash
cd server
npm install
# Lancer le serveur (tourne par défaut sur le port 3006)
npm start
```

### 2. Installation et lancement du Client (Frontend)

Ouvrez un nouveau terminal :

```bash
cd client
npm install
# Lancer l'application React
npm start
```

L'application sera accessible à l'adresse `http://localhost:3000`.

## ⚙️ Configuration

- **Client** : Le fichier `.env` côté client doit pointer vers l'URL de l'API (`REACT_APP_API_URL=http://localhost:3006`).
- **Serveur** : Assurez-vous que le dossier `public/images` existe à la racine du dossier `server` pour permettre l'enregistrement des images uploadées.

## 👤 Auteur

Projet réalisé par **Kathleen Segura** dans le cadre du devoir bilan.

---
*Développé avec ❤️ pour l'artisanat local.*