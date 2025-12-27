import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import constructionImage from "../assets/images/en-construction.png";
import "../styles/_en-construction.scss";

const MentionsLegales = () => {
  return (
    <div className="mentions-legales-page">
      <Header />

      <main className="mentions-legales-content" id="main">
        <img
          src={constructionImage}
          alt="Page en construction"
          className="mentions-legales-image"
        />

        <h1>Mentions Légales</h1>

        <p>
          La page des mentions légales est actuellement en cours de construction.
          <br />
          Nous mettons tout en œuvre pour la rendre disponible dans les plus brefs délais.
        </p>

        <p className="mentions-legales-note">
          Merci de votre compréhension.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default MentionsLegales;
