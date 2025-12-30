✅ Checklist de Finalisation - Trouve ton Artisan
1. Fonctionnalités Publiques (Frontend)
Page d'Accueil (PageAccueil.jsx)
[ ] Vérifier l'affichage des 3 "Artisans du mois" (triés par note décroissante).
[ ] S'assurer que les liens des cartes mènent bien vers la page détail (/artisans/:id).
[ ] Vérifier que les étapes "Comment trouver mon artisan ?" sont lisibles.
Liste des Artisans (ArtisanList.jsx)
[ ] Tester le filtrage par catégorie via l'URL (ex: /batiment, /services).
[ ] Tester la barre de recherche (nom, ville, spécialité).
[ ] Vérifier la pagination :
[ ] Le nombre d'éléments par page change bien (6, 12, 24).
[ ] Les boutons "Précédent" / "Suivant" fonctionnent.
[ ] Le retour en haut de page se fait au changement de page.
[ ] Vérifier l'affichage "Aucun artisan trouvé" si la recherche ne donne rien.
Page À Propos (About.jsx)
[ ] Vérifier la présence du Header et Footer.
[ ] Relire les textes pour corriger d'éventuelles coquilles.
2. Administration (Admin.jsx)
Authentification
[ ] Vérifier que l'accès est bloqué sans connexion.
[ ] Tester la connexion avec les identifiants (ex: admin / admin).
[ ] Vérifier la déconnexion (retour au formulaire de login).
Gestion des Artisans (CRUD)
[ ] Ajout (Create) : Remplir le formulaire, ajouter une image, et valider. Vérifier que l'artisan apparaît dans la liste.
[ ] Lecture (Read) : Vérifier que le tableau affiche bien les images, noms, villes et notes.
[ ] Modification (Update) : Cliquer sur "Modifier", changer une valeur (ex: note), valider et vérifier la mise à jour.
[ ] Suppression (Delete) : Cliquer sur "Supprimer", confirmer l'alerte, et vérifier que la ligne disparaît.
[ ] Recherche Admin : Tester le champ de recherche au-dessus du tableau pour filtrer rapidement la liste.
3. Backend & API (artisan.routes.js)
Serveur
[ ] Vérifier que le serveur tourne sans erreur sur le port défini (ex: 3006).
[ ] S'assurer que le dossier public/images existe à la racine du serveur pour recevoir les uploads Multer.
Routes
[ ] GET /api/artisans renvoie bien la liste JSON.
[ ] POST /api/artisans gère bien l'upload de fichier (multipart/form-data).
[ ] PUT /api/artisans/:id met à jour les données et l'image si fournie.
[ ] DELETE /api/artisans/:id supprime bien l'entrée en base de données.
4. Qualité & UI/UX
Responsive Design
[ ] Tester l'affichage sur mobile (les grilles d'artisans doivent passer en 1 colonne).
[ ] Vérifier que le tableau d'administration est scrollable horizontalement sur petit écran (.table-responsive).
Accessibilité
[ ] Vérifier que toutes les images ont un attribut alt pertinent.
[ ] Vérifier que les champs de formulaire ont des label associés.
[ ] S'assurer que le contraste des textes est suffisant (notamment sur les fonds bleus).
5. Configuration & Déploiement
Environnement
[ ] Vérifier le fichier .env côté client (REACT_APP_API_URL).
[ ] Vérifier la configuration de la base de données côté serveur.
Nettoyage
[ ] Supprimer les console.log de débogage inutiles.
[ ] Vérifier qu'il n'y a pas de code mort ou commenté inutilement.