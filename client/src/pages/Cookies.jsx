import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import constructionImage from "../assets/images/en-construction.png";
import "../styles/_en-construction.scss";

const Cookies = () => {
  return (
    <div className="cookies-page">
      <Header />
      <main className="cookies-content" id="main">
        <img
          src={constructionImage}
          alt="Page en construction"
          className="cookies-image"
        />

        <h1>Cookies</h1>

        <p>
          Cette page est actuellement en cours de construction.
          <br />
          Elle présentera prochainement les informations relatives à l’utilisation
          des cookies sur ce site.
        </p>

        <p className="cookies-note">
          Merci de votre compréhension.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
