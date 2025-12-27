import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import errorImage from "../assets/images/404.png";
import "../styles/NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Header />

      <main className="not-found-content" id="main">
        <img
          src={errorImage}
          alt="Erreur 404 - Page non trouvée"
          className="not-found-image"
        />

        <h1>404 - Page non trouvée</h1>

        <p>
          La page que vous recherchez n’existe pas ou a été déplacée.
        </p>

        <Link to="/" className="home-button">
          Retour à l’accueil
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
