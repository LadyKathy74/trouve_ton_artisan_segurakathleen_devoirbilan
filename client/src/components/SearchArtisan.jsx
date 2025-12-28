import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/SearchArtisan.scss";

export default function SearchArtisan({ onSearch = () => {}, onShowAll = () => {}, onReset = () => {} }) {
  const [filters, setFilters] = useState({
    name: "",
    specialty: "",
    location: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleResetClick = () => {
    // 1. Réinitialiser l'état local (les champs)
    setFilters({
      name: "",
      specialty: "",
      location: "",
      rating: "",
    });
    // 2. Demander au parent de réinitialiser (retour catégorie ou reset simple)
    onReset();
  };

  const handleShowAllClick = () => {
    setFilters({
      name: "",
      specialty: "",
      location: "",
      rating: "",
    });
    onShowAll();
  };

  return (
    <form className="search-artisan" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        name="name"
        placeholder="Nom de l’artisan"
        value={filters.name}
        onChange={handleChange}
        aria-label="Rechercher par nom"
      />

      <input
        type="text"
        name="specialty"
        placeholder="Spécialité"
        value={filters.specialty}
        onChange={handleChange}
        aria-label="Rechercher par spécialité"
      />

      <input
        type="text"
        name="location"
        placeholder="Localisation"
        value={filters.location}
        onChange={handleChange}
        aria-label="Rechercher par localisation"
      />

      <select 
        name="rating" 
        value={filters.rating} 
        onChange={handleChange} 
        aria-label="Filtrer par note minimale"
      >
        <option value="">Note minimum</option>
        <option value="5">5 étoiles</option>
        <option value="4">4 étoiles et +</option>
        <option value="3">3 étoiles et +</option>
      </select>

      <button type="submit" className="btn-primary">Rechercher</button>
      <button type="button" className="btn-light-blue" onClick={handleShowAllClick}>
        Afficher tout
      </button>
      <button type="button" className="btn-gray" onClick={handleResetClick}>
        Réinitialiser
      </button>
    </form>
  );
}

SearchArtisan.propTypes = {
  onSearch: PropTypes.func,
  onShowAll: PropTypes.func,
  onReset: PropTypes.func,
};
