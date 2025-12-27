import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchArtisan from "../components/SearchArtisan";
import ArtisanCard from "../components/ArtisanCard";
import "../styles/ArtisanList.scss";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

export default function ArtisanList() {
  const [fullArtisanList, setFullArtisanList] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [pageTitle, setPageTitle] = useState("Liste des artisans");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";
  const pathname = location.pathname;

  // Helper pour déterminer la catégorie selon l'URL
  // Amélioration : gestion de la casse et nettoyage du slash final
  const getCategoryFromPath = (path) => {
    const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
    
    switch (normalizedPath.toLowerCase()) {
      case "/batiment": return "Bâtiment";
      case "/services": return "Services";
      case "/fabrication": return "Fabrication";
      case "/alimentation": return "Alimentation";
      default: return null;
    }
  };

  // 1. Charger les données depuis l'API au montage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/artisans`);
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Format de données invalide (pas un tableau)");
        }

        // On formate les données pour qu'elles correspondent au format attendu par les filtres et les cartes
        const formatted = data.map((a) => ({
          id: a.id_artisan,
          name: a.nom || "",
          rating: Number(a.note) || 0,
          location: a.ville || "",
          specialty: a.Specialite?.nom_specialite || a.nom_specialite || "",
          category: a.Specialite?.Categorie?.nom_categorie || a.nom_categorie || a.categorie || "",
          description: a.a_propos || "",
          image: a.image ? `${API_URL}/images/${a.image}` : null,
        }));
        setFullArtisanList(formatted);
      } catch (err) {
        console.error("Erreur fetch artisans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Recherche via URL et filtrage initial
  useEffect(() => {
    if (loading) return;

    let results = fullArtisanList;
    let title = "Liste des artisans";
    const category = getCategoryFromPath(pathname);

    // Filtrage par catégorie selon l'URL
    if (category) {
      results = results.filter((a) => a.category === category);
      title = `Nos artisans ${category}`;
    }

    // Filtrage par recherche textuelle (URL)
    if (search) {
      results = results.filter((artisan) =>
        (artisan.name && artisan.name.toLowerCase().includes(search)) ||
        (artisan.category && artisan.category.toLowerCase().includes(search)) ||
        (artisan.location && artisan.location.toLowerCase().includes(search)) ||
        (artisan.specialty && artisan.specialty.toLowerCase().includes(search))
      );
      title = `Résultats de recherche pour "${search}"`;
    }
    setArtisans(results);
    setPageTitle(title);
  }, [search, pathname, fullArtisanList, loading]);

  // Recherche via le composant SearchArtisan (filtres manuels)
  const handleSearch = (filters) => {
    const category = getCategoryFromPath(pathname);

    const results = fullArtisanList.filter((artisan) => {
      // On applique d'abord le filtre de catégorie si on est sur une page spécifique
      if (category && artisan.category !== category) {
        return false;
      }
      return (
        (!filters.name || (artisan.name && artisan.name.toLowerCase().includes(filters.name.toLowerCase()))) &&
        // Correction : Utilisation de >= pour la note au lieu de ===
        (!filters.rating || artisan.rating >= parseInt(filters.rating, 10)) &&
        (!filters.specialty || (artisan.specialty && artisan.specialty.toLowerCase().includes(filters.specialty.toLowerCase()))) &&
        (!filters.location || (artisan.location && artisan.location.toLowerCase().includes(filters.location.toLowerCase())))
      );
    });
    setArtisans(results);
    setPageTitle(`Résultats de votre recherche (${results.length})`);
  };

  const handleShowAll = () => {
    const category = getCategoryFromPath(pathname);
    let results = fullArtisanList;
    let title = "Liste des artisans";

    if (category) {
      results = results.filter((a) => a.category === category);
      title = `Nos artisans ${category}`;
    }
    setArtisans(results);
    setPageTitle(title);
  };

  return (
    <div className="artisan-list-page">
      <Header />

      <main id="main">
        <SearchArtisan onSearch={handleSearch} onShowAll={handleShowAll} />
        <h1 className="title-with-line">{pageTitle}</h1>

        <div className="artisan-cards" role="list">
          {loading ? (
            <p>Chargement...</p>
          ) : artisans.length > 0 ? (
            artisans.map((artisan) => (
              <Link 
                to={`/artisans/${artisan.id}`} 
                key={artisan.id} 
                className="text-decoration-none" 
                role="listitem"
              >
                <ArtisanCard {...artisan} />
              </Link>
            ))
          ) : (
            <p className="no-results">Aucun artisan trouvé.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
