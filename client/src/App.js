// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/* Pages */
import PageAccueil from "./pages/PageAccueil";
import ArtisanList from "./pages/ArtisanList";
import ArtisanDetail from "./pages/ArtisanDetail";
import MentionsLegales from "./pages/MentionsLegales";
import Accessibilite from "./pages/Accessibilite";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import About from "./pages/About"; 
import AdminArtisans from "./pages/AdminArtisans";
import NotFound from "./pages/NotFound";

/* Composant utilitaire pour remonter en haut de page lors de la navigation */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Wrapper pour l'animation de transition
const AnimatedPage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

// Ce composant gère les routes et leurs animations
function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Accueil */}
        <Route path="/" element={<AnimatedPage><PageAccueil /></AnimatedPage>} />
        <Route path="/accueil" element={<Navigate to="/" replace />} />

        {/* Liste des artisans */}
        <Route path="/artisans" element={<AnimatedPage><ArtisanList /></AnimatedPage>} />

        {/* Catégories */}
        <Route path="/batiment" element={<AnimatedPage><ArtisanList /></AnimatedPage>} />
        <Route path="/services" element={<AnimatedPage><ArtisanList /></AnimatedPage>} />
        <Route path="/fabrication" element={<AnimatedPage><ArtisanList /></AnimatedPage>} />
        <Route path="/alimentation" element={<AnimatedPage><ArtisanList /></AnimatedPage>} />

        {/* Fiche artisan */}
        <Route path="/artisans/:id" element={<AnimatedPage><ArtisanDetail /></AnimatedPage>} />

        {/* Pages légales */}
        <Route path="/mentions-legales" element={<AnimatedPage><MentionsLegales /></AnimatedPage>} />
        <Route path="/donnees-personnelles" element={<AnimatedPage><Privacy /></AnimatedPage>} />
        <Route path="/accessibilite" element={<AnimatedPage><Accessibilite /></AnimatedPage>} />
        <Route path="/cookies" element={<AnimatedPage><Cookies /></AnimatedPage>} />

        {/* À propos */}
        <Route path="/a-propos" element={<AnimatedPage><About /></AnimatedPage>} />

        {/* Administration */}
        <Route path="/admin" element={<AnimatedPage><AdminArtisans /></AnimatedPage>} />

        {/* 404 */}
        <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
}
