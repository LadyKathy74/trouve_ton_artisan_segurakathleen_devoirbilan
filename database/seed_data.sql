-- 1. Catégories
INSERT INTO categories (nom_categorie) VALUES 
('Bâtiment'), 
('Services'), 
('Fabrication'), 
('Alimentation'); 

-- 2. Spécialités 
INSERT INTO specialites (nom_specialite, id_categorie) VALUES 
('Boucher', 4), 
('Boulanger', 4), 
('Chocolatier', 4), 
('Traiteur', 4), 
('Chauffagiste', 1), 
('Electricien', 1), 
('Menuisier', 1), 
('Plombier', 1), 
('Bijoutier', 3), 
('Couturier', 3), 
('Ferronier', 3), 
('Coiffeur', 2), 
('Fleuriste', 2), 
('Toiletteur', 2), 
('Webdesign', 2); 

-- 3. Artisans 
INSERT INTO artisans (nom, note, ville, a_propos, email, site_web, id_specialite) VALUES 
('Boucherie Dumont', 4.5, 'Lyon', 'Des viandes sélectionnées avec exigence, préparées avec passion et respect des méthodes authentiques. Découvrez la qualité et le goût inégalé de nos produits frais.', 'boucherie.dumond@gmail.com', NULL, 1), 
('Au pain chaud', 4.8, 'Montélimar', 'Pain chaud, croissants dorés, savoir-faire artisanal. Venez savourer nos délices fraîchement sortis du four, préparés avec amour et tradition pour régaler vos papilles.', 'aupainchaud@hotmail.com', NULL, 2), 
('Chocolaterie Labbé', 4.9, 'Lyon', 'Chocolats fins, passion pure, plaisir garanti. Découvrez nos créations artisanales, alliant tradition et innovation pour une expérience gustative inoubliable.', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 3), 
('Traiteur Truchon', 4.1, 'Lyon', 'Des menus sur mesure, élaborés avec des produits frais et un savoir‑faire culinaire authentique.', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 4), 
('Orville Salmons', 5.0, 'Evian', 'Installation, entretien, dépannage : chaleur maîtrisée. Expertise et service de qualité pour votre confort thermique toute l''année.', 'o-salmons@live.com', NULL, 5), 
('Mont Blanc Électricité', 4.5, 'Chamonix', 'Courant maîtrisé, sécurité assurée, service rapide. Votre électricien de confiance pour tous vos besoins résidentiels et commerciaux.', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 6), 
('Boutot & fils', 4.7, 'Bourg-en-bresse', 'Bois travaillé avec passion, créations sur mesure. Donnez vie à vos projets avec notre expertise en menuiserie artisanale.', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 7), 
('Vallis Bellemare', 4.0, 'Vienne', 'Interventions rapides, solutions durables. Votre plombier de confiance pour tous vos besoins en installation, réparation et entretien sanitaire.', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 8), 
('Claude Quinn', 4.2, 'Aix-les-bains', 'Bijoux uniques, savoir-faire exceptionnel. Découvrez nos créations artisanales qui allient élégance et qualité pour sublimer chaque moment de votre vie.', 'claude.quinn@gmail.com', NULL, 9), 
('Amitee Lécuyer', 4.5, 'Annecy', 'Créations sur mesure, expertise en couture artisanale. Votre couturier de confiance pour des vêtements uniques et des retouches parfaites.', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 10), 
('Ernest Carignan', 5.0, 'Le Puy-en-Velay', 'Ferronnerie artisanale, expertise et créations sur mesure. Votre ferronier de confiance pour tous vos projets métalliques.', 'e-carigan@hotmail.com', NULL, 11), 
('Royden Charbonneau', 3.8, 'Saint-Priest', 'Style, soin, et coup de maître. Votre coiffeur de confiance pour un look impeccable.', 'r.charbonneau@gmail.com', NULL, 12), 
('Leala Dennis', 3.8, 'Chambéry', 'Style, soin, et coup de maître. Votre coiffeur de confiance pour un look impeccable.', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 12), 
('C''est sup''hair', 4.1, 'Romans-sur-Isère', 'Style, soin, et coup de maître. Votre coiffeur de confiance pour un look impeccable.', 'sup-hair@gmail.com', 'https://sup-hair.fr', 12), 
('Le monde des fleurs', 4.6, 'Annonay', 'Bouquets sur mesure, fraîcheur et poésie. Votre fleuriste de confiance pour toutes les occasions.', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 13), 
('Valérie Laderoute', 4.5, 'Valence', 'Soins et beauté pour vos compagnons. Votre toiletteur de confiance pour un service attentionné et professionnel.', 'v-laredoute@gmail.com', NULL, 14), 
('CM Graphisme', 4.4, 'Valence', 'Design web et graphisme sur mesure. Votre graphiste de confiance pour un site web moderne et attrayant.', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 15);
