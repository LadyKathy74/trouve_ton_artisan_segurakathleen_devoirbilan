import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/About.scss';

const About = () => {
  return (
    <div className="about-page">
      <Header />

      <main className="about-content container" id="main">
        <h1>À propos</h1>

        <section className="about-section">
          <h2>Notre mission</h2>
          <p>
            Trouve ton artisan est une plateforme conçue pour faciliter la rencontre entre les artisans
            de la région Auvergne‑Rhône‑Alpes et les citoyens. Notre objectif est d’offrir un outil
            simple, accessible et fiable permettant de trouver rapidement un artisan qualifié près de
            chez soi.
          </p>
        </section>

        <section className="about-section">
          <h2>Pourquoi cette plateforme&nbsp;?</h2>
          <ul>
            <li>Donner de la visibilité aux artisans locaux</li>
            <li>Proposer une recherche intuitive par nom, spécialité ou catégorie</li>
            <li>Permettre un contact direct via un formulaire sécurisé</li>
            <li>Garantir une expérience accessible à tous (WCAG 2.1)</li>
            <li>Offrir un site rapide, responsive et conforme aux standards du web</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Pour qui&nbsp;?</h2>
          <p>
            Le site s’adresse à tous les habitants de la région, aux collectivités, aux institutions,
            ainsi qu’à toute personne recherchant un artisan fiable, proche et vérifié.
          </p>
        </section>

        <section className="about-section">
          <h2>Accessibilité</h2>
          <p>
            Le site respecte les bonnes pratiques WCAG 2.1 : contrastes optimisés, navigation clavier,
            balises ARIA et structure sémantique propre. L’accès à l’information doit être universel.
          </p>
        </section>

        <section className="about-section">
          <h2>Sécurité</h2>
          <p>
            Nous appliquons des mesures essentielles : validation des entrées, protection anti‑spam,
            API sécurisée (CORS + clé d’accès), et hébergement fiable.
          </p>
        </section>

        <section className="about-section">
          <h2>Une initiative régionale</h2>
          <p>
            Trouve ton artisan est un projet soutenu par la région Auvergne‑Rhône‑Alpes, dans une
            démarche de valorisation du savoir‑faire local et de modernisation numérique.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
