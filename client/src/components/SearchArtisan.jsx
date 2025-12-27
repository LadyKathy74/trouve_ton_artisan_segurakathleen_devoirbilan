import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/SearchArtisan.scss";

export default function SearchArtisan({ onSearch = () => {}, onShowAll = () => {} }) {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
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

  const handleReset = () => {
    setFilters({
      name: "",
      category: "",
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
        name="category"
        placeholder="Spécialité"
        value={filters.category}
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

      <select name="rating" value={filters.rating} onChange={handleChange} aria-label="Filtrer par note minimale">
        <option value="">Note</option>
        <option value="5">★★★★★</option>
        <option value="4">★★★★☆</option>
        <option value="3">★★★☆☆</option>
        <option value="2">★★☆☆☆</option>
        <option value="1">★☆☆☆☆</option>
      </select>

      <button type="submit" className="btn-primary">Rechercher</button>
      <button type="button" className="btn-secondary" onClick={onShowAll}>
        Afficher tout
      </button>
      <button type="button" className="btn-secondary" onClick={handleReset}>
        Réinitialiser
      </button>
    </form>
  );
}

SearchArtisan.propTypes = {
  onSearch: PropTypes.func,
  onShowAll: PropTypes.func,
};
