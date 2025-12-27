import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import constructionImage from "../assets/images/en-construction.png";
import "../styles/_en-construction.scss";

export default function Privacy() {
  return (
    <div className="privacy-page">
      <Header />

      <main className="privacy-content" id="main">
        <img
          src={constructionImage}
          alt="Page en construction"
          className="privacy-image"
        />

        <h1>Données personnelles</h1>

        <p>
          Cette page est actuellement en cours de construction.
          <br />
          Elle présentera prochainement les informations relatives au traitement
          des données personnelles.
        </p>

        <p className="privacy-note">
          Merci de votre compréhension.
        </p>
      </main>

      <Footer />
    </div>
  );
}
