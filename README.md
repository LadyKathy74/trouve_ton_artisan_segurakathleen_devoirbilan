
# 🏠 Trouve ton Artisan

Bienvenue sur le dépôt du projet **Trouve ton Artisan**.
Cette application web permet de mettre en relation des particuliers avec des artisans de la région Auvergne-Rhône-Alpes.

## 🏗 Architecture du Projet

Ce projet est une application **Full Stack** composée de deux parties principales :

- **Frontend (`/client`)** : Interface utilisateur réalisée avec **React**.
- **Backend (`/server`)** : API REST réalisée avec **Node.js**, **Express** et **Sequelize** (MySQL).

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- Node.js (v14 ou supérieur)
- MySQL (Serveur de base de données)
- Un éditeur de code (ex: VS Code)

## 🚀 Installation et Démarrage

### 1. Cloner le projet
```bash
git clone <votre-url-repo>
cd trouve_ton_artisan_segurakathleen_devoirbilan
```

### 2. Configuration de la Base de Données
1. Lancez votre serveur MySQL (via WAMP, XAMPP, ou Docker).
2. Créez une base de données vide nommée `trouve_ton_artisan_db`.
3. (Optionnel) Configurez les accès dans un fichier `.env` dans le dossier `server` si vos identifiants ne sont pas `root` / (vide).

### 3. Installation et Lancement du Backend
```bash
cd server
npm install

# Remplir la base de données avec les données de test
node seed.js

# Démarrer le serveur (Port 3006)
npm start
```

### 4. Installation et Lancement du Frontend
Ouvrez un **nouveau terminal** à la racine du projet :
```bash
cd client
npm install

# Démarrer l'application React (Port 3000)
npm start
```

L'application sera accessible sur http://localhost:3000.

## 🌐 Liens Utiles

- **Site en ligne** : [trouve-ton-artisan-ebon.vercel.app/](https://trouve-ton-artisan-ebon.vercel.app/)
- **Maquettes Figma** :https://www.figma.com/design/0vDIwotZXW9X18Kfd1duEL/trouve_ton_artisan?node-id=205-427&t=kFi1UZnvlQO7YKwS-1
## 👤 Auteur
Kathleen Segura - Devoir Bilan
