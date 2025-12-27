// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

/* Pages */
import PageAccueil from "./pages/PageAccueil";
import ArtisanList from "./pages/ArtisanList";
import ArtisanDetail from "./pages/ArtisanDetail";
import MentionsLegales from "./pages/MentionsLegales";
import Accessibilite from "./pages/Accessibilite";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import About from "./pages/About";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

/* Composant utilitaire pour remonter en haut de page lors de la navigation */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* Accueil */}
        <Route path="/" element={<PageAccueil />} />
        <Route path="/accueil" element={<Navigate to="/" replace />} />

        {/* Liste des artisans */}
        <Route path="/artisans" element={<ArtisanList />} />

        {/* Catégories */}
        <Route path="/batiment" element={<ArtisanList />} />
        <Route path="/services" element={<ArtisanList />} />
        <Route path="/fabrication" element={<ArtisanList />} />
        <Route path="/alimentation" element={<ArtisanList />} />

        {/* Fiche artisan */}
        <Route path="/artisans/:id" element={<ArtisanDetail />} />

        {/* Pages légales */}
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/donnees-personnelles" element={<Privacy />} />
        <Route path="/accessibilite" element={<Accessibilite />} />
        <Route path="/cookies" element={<Cookies />} />

        {/* À propos */}
        <Route path="/a-propos" element={<About />} />

        {/* Administration */}
        <Route path="/admin" element={<Admin />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}
