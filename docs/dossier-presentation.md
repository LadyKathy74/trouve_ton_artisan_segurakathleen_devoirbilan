Dossier de Présentation : Projet "Trouve ton artisan"
1. Synthèse du Projet
"Trouve ton artisan" est une plateforme web moderne et performante conçue pour mettre en relation les artisans de la région Auvergne-Rhône-Alpes avec les particuliers et professionnels à la recherche de savoir-faire local.

Le site offre une interface claire et intuitive pour les utilisateurs, ainsi qu'un panneau d'administration complet et sécurisé pour la gestion des données.

2. Objectifs
Valoriser l'artisanat local : Offrir une visibilité accrue aux artisans de la région.
Simplifier la recherche : Permettre aux utilisateurs de trouver rapidement un artisan qualifié par catégorie, spécialité ou localisation.
Faciliter le contact : Mettre à disposition des outils de contact direct et fiables.
Garantir la qualité : Assurer une expérience utilisateur optimale grâce à une plateforme rapide, accessible (conforme WCAG) et sécurisée.
3. Fonctionnalités Clés
Côté Utilisateur (Public)
Page d'accueil dynamique :
Présentation des "Artisans du mois" basée sur les meilleures notes pour mettre en avant l'excellence.
Guide simple en 4 étapes expliquant le fonctionnement du site.
Navigation par catégories :
Accès direct aux listes d'artisans via des catégories claires : Bâtiment, Services, Fabrication, Alimentation.
Recherche et Filtrage Avancés :
Un module de recherche permet de filtrer les artisans par nom, spécialité, et localisation.
Une barre de recherche globale dans l'en-tête pour des requêtes rapides.
Pagination Intelligente :
Les listes d'artisans sont paginées pour une navigation fluide, avec un système d'ellipses pour les longues listes.
L'utilisateur peut choisir le nombre de résultats à afficher par page (6, 12, ou 24).
Fiches Artisans Détaillées :
Chaque artisan possède une page de profil complète (accessible via /artisans/:id).
Côté Administrateur (Privé)
Portail de Connexion Sécurisé :
Accès à l'interface de gestion via une page /admin protégée par un identifiant et un mot de passe.
Tableau de Bord (Dashboard) :
Interface centralisée pour la gestion complète des artisans.
Gestion CRUD Complète des Artisans :
Create : Un formulaire complet permet d'ajouter un nouvel artisan avec tous ses détails : nom, email, ville, note, à propos, site web, spécialité et téléchargement d'image.
Read : Un tableau liste tous les artisans avec leurs informations principales.
Update : Le formulaire se pré-remplit pour modifier facilement les informations d'un artisan existant.
Delete : Suppression sécurisée d'un artisan avec une demande de confirmation.
Outils de Gestion de Liste :
Barre de recherche pour filtrer instantanément les artisans dans le tableau par nom, ville ou spécialité.
Pagination intégrée au tableau pour gérer efficacement un grand nombre d'artisans.
4. Stack Technique
Frontend :
React : Pour une interface utilisateur réactive et modulaire.
React Router : Pour la gestion des routes et de la navigation.
SCSS : Pour un stylage avancé, organisé avec des variables, des mixins et une architecture BEM.
Backend :
Node.js & Express.js : Pour un serveur API robuste et rapide.
Sequelize (supposé) : ORM pour interagir avec une base de données SQL, gérer les modèles Artisan, Specialite, etc.
Multer : Middleware pour gérer efficacement les téléversements de fichiers (images des artisans).
5. Points Forts et Bonnes Pratiques
Accessibilité (A11y) : Le projet intègre les bonnes pratiques WCAG avec des balises ARIA (aria-label, aria-hidden, role), une structure sémantique (HTML5), et une navigation au clavier fonctionnelle.
Responsive Design : L'interface est entièrement adaptable aux ordinateurs, tablettes et mobiles grâce à l'utilisation de media queries et de techniques de layout flexibles (Flexbox, Grid).
Performance : L'utilisation de React.lazy (implicite dans une structure Create React App) et d'attributs loading="lazy" sur les images contribue à un chargement rapide des pages.
Qualité du Code : Le code est bien structuré, séparant les pages, les composants, les services API et les styles, ce qui garantit une excellente maintenabilité.
Sécurité : Des mesures de base sont en place, comme la protection de la page admin et la gestion des FormData côté serveur pour les uploads, prévenant certaines vulnérabilités.