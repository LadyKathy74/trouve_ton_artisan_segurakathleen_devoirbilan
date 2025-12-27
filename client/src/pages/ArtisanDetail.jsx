// src/pages/ArtisanDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import "../styles/ArtisanDetail.scss";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export default function ArtisanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/artisans/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Artisan non trouvé");
        return res.json();
      })
      .then((data) => {
        setArtisan(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const handleRating = (value) => {
    setRating(value);
    // Tu pourras envoyer la note au backend ici
  };

  if (loading) return <div className="artisan-detail-page"><Header /><main className="container" style={{padding:"50px"}}>Chargement...</main><Footer /></div>;

  if (error || !artisan) {
    return (
      <div className="artisan-detail-page">
        <Header />
        <main className="artisan-detail-content" id="main">
          <h1>Artisan introuvable</h1>
          <p>L’artisan demandé n’existe pas ou a été supprimé.</p>
          <Link to="/artisans" className="back-link">Retour à la liste</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="artisan-detail-page">
      <Header />

      <main className="artisan-detail-content" id="main">

        {/* --- BLOC 2 COLONNES --- */}
        <div className="artisan-columns">

          {/* --- COLONNE 1 : Infos artisan dynamiques --- */}
          <section className="intro-section">
            <h1>{artisan.nom}</h1>

            <div className="rating-display">
              {"★".repeat(Math.round(Number(artisan.note)))}
              {"☆".repeat(5 - Math.round(Number(artisan.note)))}
            </div>

            <p><strong>Spécialité :</strong> {artisan.Specialite?.nom_specialite}</p>
            <p><strong>Catégorie :</strong> {artisan.Specialite?.Categorie?.nom_categorie}</p>
            <p><strong>Localisation :</strong> {artisan.ville}</p>

            <p className="description">{artisan.a_propos}</p>

            {artisan.site_web && (
              <a
                href={artisan.site_web}
                target="_blank"
                rel="noopener noreferrer"
                className="website-link"
              >
                Visiter le site web
              </a>
            )}
          </section>

          {/* --- COLONNE 2 : Image + notation --- */}
          <section className="side-section">
            <div className="artisan-image-circle">
              {artisan.image && (
                <img 
                  src={`${API_URL}/images/${artisan.image}`} 
                  alt={artisan.nom} 
                />
              )}
            </div>

            <div className="rating-section">
              <h2>Notez cet artisan</h2>

              <div className="stars" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    aria-label={`Noter ${star} étoile(s)`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <p className="rating-message">
                  Merci pour votre note : {rating} étoile{rating > 1 ? "s" : ""} !
                </p>
              )}
            </div>
          </section>
        </div>

        {/* --- SECTION CONTACT --- */}
        <section className="contact-section">
          <h2>Contacter cet artisan</h2>
          <ContactForm artisanName={artisan.nom} artisanEmail={artisan.email} />
        </section>

        {/* Utilisation de navigate(-1) pour revenir à la page précédente (catégorie ou recherche) */}
        <button 
          onClick={() => navigate(-1)} 
          className="back-link" 
          style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', textDecoration: 'underline'}}>
          ← Retour
        </button>
        <br />
        <Link to="/" className="back-link">
          ← Retour à la page d'accueil
        </Link>
      </main>

      <Footer />
    </div>
  );
}
