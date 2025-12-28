import React, { useState, useEffect, useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchArtisan from "../components/SearchArtisan";
import ArtisanCard from "../components/ArtisanCard";
import { artisansData } from "../assets/data/artisansData";
import "../styles/ArtisanList.scss";

const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:3006").replace(/\/$/, "");

// Helper pour déterminer la catégorie selon l'URL
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

export default function ArtisanList() {
  const [fullArtisanList, setFullArtisanList] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [pageTitle, setPageTitle] = useState("Liste des artisans");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";
  const pathname = location.pathname;

  // 1. Charger les données
  useEffect(() => {
    console.log("URL API utilisée :", API_URL);
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/artisans`);
        if (!res.ok) throw new Error("Erreur réseau");
        const data = await res.json();

        const formatted = data.map((a) => ({
          id: a.id_artisan || a.id,
          name: a.nom || a.name || "",
          rating: Number(a.note) || Number(a.rating) || 0,
          location: a.ville || a.location || "",
          specialty: a.Specialite?.nom_specialite || a.nom_specialite || a.specialty || "",
          category: a.Specialite?.Categorie?.nom_categorie || a.nom_categorie || a.categorie || a.category || "",
          description: a.a_propos || a.description || "",
          image: a.image ? `${API_URL}/images/${a.image}` : null,
        }));

        setFullArtisanList(formatted.length > 0 ? formatted : artisansData);
      } catch (err) {
        console.error("Erreur fetch artisans:", err);
        setFullArtisanList(artisansData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Filtrage initial (URL ou Catégorie)
  useEffect(() => {
    if (loading) return;

    let results = fullArtisanList;
    let title = "Liste des artisans";
    const category = getCategoryFromPath(pathname);

    // Filtre par catégorie (URL)
    if (category) {
      results = results.filter((a) => a.category === category);
      title = `Nos artisans ${category}`;
    }

    // Filtre par recherche textuelle (URL ?search=...)
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
    setCurrentPage(1); // Retour à la page 1 lors d'un changement de filtre
  }, [search, pathname, fullArtisanList, loading]);

  // 3. Recherche manuelle (Formulaire SearchArtisan)
  const handleSearch = useCallback((filters) => {
    const category = getCategoryFromPath(pathname);

    const results = fullArtisanList.filter((artisan) => {
      // On respecte la catégorie de la page actuelle
      if (category && artisan.category !== category) {
        return false;
      }
      
      // Logique de filtrage stricte
      const matchName = !filters.name || (artisan.name && artisan.name.toLowerCase().includes(filters.name.toLowerCase()));
      const matchSpecialty = !filters.specialty || (artisan.specialty && artisan.specialty.toLowerCase().includes(filters.specialty.toLowerCase()));
      const matchLocation = !filters.location || (artisan.location && artisan.location.toLowerCase().includes(filters.location.toLowerCase()));
      const matchRating = !filters.rating || artisan.rating >= parseInt(filters.rating, 10);

      return matchName && matchSpecialty && matchLocation && matchRating;
    });

    setArtisans(results);
    setPageTitle(`Résultats de votre recherche (${results.length})`);
    setCurrentPage(1); // Retour à la page 1 lors d'une recherche
  }, [fullArtisanList, pathname]);

  // 4. Réinitialisation (Bouton Afficher tout)
  const handleShowAll = useCallback(() => {
    if (pathname !== "/artisans") {
      // Si on est sur une catégorie (ex: /batiment), on va sur /artisans
      // MAIS on mémorise d'où on vient (state: { fromCategory: ... })
      navigate("/artisans", { state: { fromCategory: pathname } });
    } else {
      // Si on est déjà sur /artisans, on reset juste la liste
      setArtisans(fullArtisanList);
      setPageTitle("Liste des artisans");
      // On garde l'état s'il existe pour que "Réinitialiser" fonctionne toujours
      navigate(pathname, { replace: true, state: location.state });
    }
  }, [fullArtisanList, navigate, pathname, location.state]);

  // 5. Reset intelligent (Bouton Réinitialiser)
  const handleReset = useCallback(() => {
    // Si on a mémorisé une catégorie précédente (ex: on vient de cliquer sur Afficher tout depuis Bâtiment)
    if (location.state && location.state.fromCategory) {
      navigate(location.state.fromCategory);
    } else {
      // Sinon, comportement standard : on remet à zéro la page actuelle
      const category = getCategoryFromPath(pathname);
      let results = fullArtisanList;
      let title = "Liste des artisans";

      if (category) {
        results = results.filter((a) => a.category === category);
        title = `Nos artisans ${category}`;
      }
      setArtisans(results);
      setPageTitle(title);
      navigate(pathname, { replace: true });
    }
  }, [fullArtisanList, navigate, pathname, location.state]);

  // 6. Remonter en haut de page lors du changement de page (Pagination)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // --- Logique de Pagination ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = artisans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(artisans.length / itemsPerPage);

  // Fonction pour générer les numéros de page avec ellipses (...)
  const getPageNumbers = () => {
    // Si le nombre de pages est petit, on affiche tout
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 1; // Nombre de pages à afficher autour de la page courante
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="artisan-list-page">
      <Header />

      <main id="main">
        <SearchArtisan onSearch={handleSearch} onShowAll={handleShowAll} onReset={handleReset} />
        <h1 className="title-with-line">{pageTitle}</h1>

        {/* Sélecteur du nombre d'éléments par page */}
        <div style={{ marginBottom: "1rem", textAlign: "right" }}>
          <label htmlFor="itemsPerPage" style={{ marginRight: "0.5rem" }}>Afficher :</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Retour à la première page pour éviter les pages vides
            }}
          >
            <option value={6}>6 par page</option>
            <option value={12}>12 par page</option>
            <option value={24}>24 par page</option>
          </select>
        </div>

        <div className="artisan-cards" role="list">
          {loading ? (
            <p>Chargement...</p>
          ) : currentItems.length > 0 ? (
            currentItems.map((artisan) => (
              <Link 
                to={`/artisans/${artisan.id}`} 
                key={artisan.id} 
                className="artisan-card-link" 
                role="listitem"
              >
                <ArtisanCard {...artisan} />
              </Link>
            ))
          ) : (
            <p className="no-results">Aucun artisan trouvé.</p>
          )}
        </div>

        {/* Contrôles de Pagination */}
        {artisans.length > itemsPerPage && (
          <nav aria-label="Navigation des pages" style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1rem", fontWeight: "bold" }}>
              Page {currentPage} sur {totalPages}
            </div>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                  &laquo; Précédent
                </button>
              </li>
              
              {getPageNumbers().map((pageNum, index) => (
                <li 
                  key={index} 
                  className={`page-item ${pageNum === currentPage ? "active" : ""} ${pageNum === "..." ? "disabled" : ""}`}
                >
                  <button 
                    className="page-link" 
                    onClick={() => typeof pageNum === "number" && setCurrentPage(pageNum)}
                    disabled={pageNum === "..."}
                  >
                    {pageNum}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
                  Suivant &raquo;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </main>

      <Footer />
    </div>
  );
}
