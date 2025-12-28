// src/pages/PageAccueil.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ArtisanCard from "../components/ArtisanCard.jsx";
import { artisansData } from "../assets/data/artisansData";

import designImage from "../assets/images/Design.png";
import "../styles/PageAccueil.scss";

const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:3002").replace(/\/$/, "");

export default function PageAccueil() {
  const [artisansDuMois, setArtisansDuMois] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ============================================
     Fetch artisans du mois
  ============================================ */
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await fetch(`${API_URL}/api/artisans`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Les données reçues ne sont pas un tableau");
        }

        const formatted = data.map((item) => ({
          id: item.id_artisan || item.id,
          name: item.nom || item.name || "",
          rating: Number(item.note) || Number(item.rating) || 0,
          location: item.ville || item.location || "",
          specialty: item.Specialite?.nom_specialite || item.nom_specialite || item.specialty || "Divers",
          category: item.Specialite?.Categorie?.nom_categorie || item.nom_categorie || item.categorie || item.category || "",
          image: item.image ? `${API_URL}/images/${item.image}` : null,
        }));

        // Sélection des 3 artisans du mois (les mieux notés)
        const topArtisans = formatted.sort((a, b) => b.rating - a.rating).slice(0, 3);
        setArtisansDuMois(topArtisans);
      } catch (error) {
        console.error("Erreur lors du chargement des artisans :", error);
        // Fallback : utilisation des données statiques si l'API échoue
        setArtisansDuMois(artisansData.sort((a, b) => b.rating - a.rating).slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  /* ============================================
     Rendu
  ============================================ */
  return (
    <div className="page-accueil">
      <Header />

      <main className="page-accueil__main" id="main">

        {/* SECTION INTRO */}
        <section className="page-accueil__intro">
          <div className="page-accueil__intro-text">
            <h1 className="page-accueil__title">Comment trouver mon artisan ?</h1>

            <ol className="page-accueil__steps">
              <li>Choisir la catégorie d'artisanat dans le menu.</li>
              <li>Choisir un artisan.</li>
              <li>Le contacter via le formulaire de contact.</li>
              <li>Une réponse sera apportée sous 48h.</li>
            </ol>
          </div>

          <div className="page-accueil__intro-image" aria-hidden="true">
            <img src={designImage} alt="" loading="lazy" />
          </div>
        </section>

        {/* SECTION ARTISANS DU MOIS */}
        <section className="page-accueil__featured">
          <h2 className="page-accueil__subtitle">Artisans du mois</h2>

          {loading ? (
            <p>Chargement des artisans...</p>
          ) : (
            <div className="page-accueil__artisan-list" role="list">
              {artisansDuMois.map((artisan) => (
                <div
                  key={artisan.id}
                  role="listitem"
                  className="page-accueil__artisan-item"
                >
                  <Link
                    to={`/artisans/${artisan.id}`}
                    className="page-accueil__artisan-link"
                  >
                    <ArtisanCard {...artisan} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
