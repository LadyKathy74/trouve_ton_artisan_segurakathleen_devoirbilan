-- Suppression des tables si elles existent déjà 
DROP TABLE IF EXISTS artisans; 
DROP TABLE IF EXISTS specialites; 
DROP TABLE IF EXISTS categories;

-- Table : catégories 
CREATE TABLE categories ( 
    id_categorie INT PRIMARY KEY AUTO_INCREMENT, 
    nom_categorie VARCHAR(50) NOT NULL 
);

-- Table : spécialités 
CREATE TABLE specialites ( 
    id_specialite INT PRIMARY KEY AUTO_INCREMENT, 
    nom_specialite VARCHAR(50) NOT NULL, 
    id_categorie INT NOT NULL, 
    FOREIGN KEY (id_categorie) REFERENCES categories(id_categorie) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE 
);

-- Table : artisans 
CREATE TABLE artisans ( 
    id_artisan INT PRIMARY KEY AUTO_INCREMENT, 
    nom VARCHAR(100) NOT NULL, 
    note DECIMAL(2,1), 
    ville VARCHAR(100), 
    a_propos TEXT, 
    email VARCHAR(100), 
    site_web VARCHAR(255), 
    id_specialite INT NOT NULL, 
    FOREIGN KEY (id_specialite) REFERENCES specialites(id_specialite) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE 
);