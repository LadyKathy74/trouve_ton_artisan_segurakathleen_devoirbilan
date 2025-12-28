# 🎨 Trouve ton Artisan - Frontend

Bienvenue sur la partie client de l'application **Trouve ton Artisan**. Ce projet est une interface utilisateur réalisée avec **React** qui permet de rechercher, consulter et contacter des artisans de la région Auvergne-Rhône-Alpes.

## 🛠 Technologies utilisées

- **React** (v19)
- **Sass** (SCSS) pour le style
- **React Router** pour la navigation
- **Bootstrap** pour la structure et les composants UI

## 🚀 Installation et Démarrage

Assurez-vous d'avoir **Node.js** installé sur votre machine.

### 1. Installation des dépendances
Placez-vous dans le dossier `client` et exécutez :
```bash
npm install
```

### 2. Lancement de l'application
```bash
npm start
```
L'application s'ouvrira automatiquement sur http://localhost:3000.

> **⚠️ Important :** Pour que les données des artisans s'affichent, le **Backend** doit être démarré (voir dossier `../server`) et accessible sur le port **3006**.

## ⚙️ Configuration

L'application est configurée pour se connecter à l'API locale par défaut.
Vous pouvez modifier l'URL de l'API (par exemple pour la mise en production) en créant un fichier `.env` à la racine du dossier `client` :

```env
REACT_APP_API_URL=http://localhost:3006
```

## 📦 Scripts disponibles

- `npm start` : Lance l'application en mode développement.
- `npm run build` : Compile l'application pour la production dans le dossier `build`.
- `npm test` : Lance les tests unitaires.

