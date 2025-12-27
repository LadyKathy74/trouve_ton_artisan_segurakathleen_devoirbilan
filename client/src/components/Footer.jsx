import React from 'react';
import '../styles/Footer.scss';
import Logo from '../assets/images/Logo.png';
import AraLogo from '../assets/images/ARA-Logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer c-footer__wrapper variant2">
      <div className="footer__content">
        
        {/* Colonne 1 : Image promo */}
        <div className="footer__column footer__promo">
          <Link to="/" aria-label="Retour à l'accueil">
            <img 
              src={Logo} 
              alt="Trouve ton artisan" 
            />
          </Link>
        </div>

        {/* Colonne 2 : Contact */}
        <div className="footer__column">
          <h3>Contact</h3>
          <address>
            <a
              href="https://www.google.com/maps?q=101+cours+Charlemagne,+69269+LYON+CEDEX+02,+France"
              target="_blank"
              rel="noopener noreferrer"
            >
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France
            </a>
            <br />
            <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
          </address>
        </div>

        {/* Colonne 3 : Pages légales */}
        <div className="footer__column">
          <h3>Pages Légales</h3>
          <ul>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
            <li><Link to="/donnees-personnelles">Données personnelles</Link></li>
            <li><Link to="/accessibilite">Accessibilité</Link></li>
            <li><Link to="/cookies">Cookies</Link></li>
          </ul>
        </div>

        {/* Colonne 4 : Logo ARA */}
        <div className="footer__column footer__logo">
          <a href="https://www.auvergnerhonealpes.fr/" target="_blank" rel="noopener noreferrer">
            <img src={AraLogo} alt="La Région Auvergne-Rhône-Alpes" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
