import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchArtisan from "../components/SearchArtisan";
import ArtisanCard from "../components/ArtisanCard";
import "../styles/ArtisanList.scss";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

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
  const getCategoryFromPath = (path) => {
    switch (path) {
      case "/batiment": return "Bâtiment";
      case "/services": return "Services";
      case "/fabrication": return "Fabrication";
      case "/alimentation": return "Alimentation";
      default: return null;
    }
  };

  // 1. Charger les données depuis l'API au montage
  useEffect(() => {
    fetch(`${API_URL}/api/artisans`)
      .then((res) => res.json())
      .then((data) => {
        // On formate les données pour qu'elles correspondent au format attendu par les filtres et les cartes
        const formatted = data.map((a) => ({
          id: a.id_artisan,
          name: a.nom || "",
          rating: Number(a.note) || 0,
          location: a.ville || "",
          specialty: a.Specialite?.nom_specialite || "",
          category: a.Specialite?.Categorie?.nom_categorie || "",
          description: a.a_propos || "",
          image: a.image ? `${API_URL}/images/${a.image}` : null,
        }));
        setFullArtisanList(formatted);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // Recherche via URL
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

    if (search) {
      results = results.filter((artisan) =>
        artisan.name.toLowerCase().includes(search) ||
        artisan.category.toLowerCase().includes(search) ||
        artisan.location.toLowerCase().includes(search)
      );
      title = `Résultats de recherche pour "${search}"`;
    }
    setArtisans(results);
    setPageTitle(title);
  }, [search, pathname, fullArtisanList, loading]);

  // Recherche via SearchArtisan.jsx
  const handleSearch = (filters) => {
    const category = getCategoryFromPath(pathname);

    const results = fullArtisanList.filter((artisan) => {
      // On applique d'abord le filtre de catégorie si on est sur une page spécifique
      if (category && artisan.category !== category) {
        return false;
      }
      return (
        (!filters.name ||
          artisan.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.rating || artisan.rating === parseInt(filters.rating)) &&
        (!filters.specialty ||
          artisan.specialty.toLowerCase() === filters.specialty.toLowerCase()) &&
        (!filters.location ||
          artisan.location.toLowerCase().includes(filters.location.toLowerCase()))
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

        <div className="artisan-cards">
          {loading ? (
            <p>Chargement...</p>
          ) : artisans.length > 0 ? (
            artisans.map((artisan) => (
              <Link to={`/artisans/${artisan.id}`} key={artisan.id} className="text-decoration-none">
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
