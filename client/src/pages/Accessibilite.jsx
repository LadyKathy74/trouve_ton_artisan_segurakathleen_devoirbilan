// src/pages/Accessibilite.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import constructionImage from "../assets/images/en-construction.png";
import "../styles/_en-construction.scss";

export default function Accessibilite() {
  return (
    <div className="accessibilite-page">
      <Header />

      <main className="accessibilite-content" id="main">
        <img
          src={constructionImage}
          alt="Page en construction"
          className="accessibilite-image"
        />

        <h1>Accessibilité</h1>

        <p>
          Cette page est actuellement en cours de construction.
          <br />
          Elle présentera prochainement les informations relatives à l’accessibilité
          du site et aux mesures mises en place pour garantir une navigation inclusive.
        </p>

        <p className="accessibilite-note">
          Merci de votre compréhension.
        </p>
      </main>

      <Footer />
    </div>
  );
}
