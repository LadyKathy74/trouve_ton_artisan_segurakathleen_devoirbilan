// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.scss";
import logo from "../assets/images/Logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/artisans?search=${encodeURIComponent(searchTerm)}`);
      setMenuOpen(false); // ferme le menu mobile après recherche
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const searchFormContent = (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Rechercher un artisan"
      />
      <button type="submit" aria-label="Lancer la recherche">
        <span aria-hidden="true">🔍</span>
      </button>
    </>
  );

  return (
    <header className="header">

      {/* LOGO */}
      <Link to="/" className="logo" onClick={closeMenu}>
        <img src={logo} alt="Logo Trouve ton artisan" className="logo-img" />
      </Link>

      {/* HAMBURGER */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        aria-label="Ouvrir ou fermer le menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* MENU SLIDE */}
      <nav className={`nav-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        
        {/* Liens */}
        <ul className="nav-links">
          <li><Link className="nav-button" to="/" onClick={closeMenu}>Accueil</Link></li>
          <li><Link className="nav-button" to="/batiment" onClick={closeMenu}>Bâtiment</Link></li>
          <li><Link className="nav-button" to="/services" onClick={closeMenu}>Services</Link></li>
          <li><Link className="nav-button" to="/fabrication" onClick={closeMenu}>Fabrication</Link></li>
          <li><Link className="nav-button" to="/alimentation" onClick={closeMenu}>Alimentation</Link></li>
        </ul>

        {/* Recherche desktop/tablette - Le contenu est partagé avec la version mobile */}
        <form className="search-dt" onSubmit={handleSearch}>
          {searchFormContent}
        </form>

        {/* Recherche mobile - Le contenu est partagé avec la version desktop */}
        <form className="search-mobile" onSubmit={handleSearch}>
          {searchFormContent}
        </form>
      </nav>
    </header>
  );
}
