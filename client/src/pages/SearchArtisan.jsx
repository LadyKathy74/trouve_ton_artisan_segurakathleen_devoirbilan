import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchArtisan.scss';

export default function SearchArtisan({ onSearch, onShowAll }) {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoie les filtres au composant parent (ArtisanList)
    onSearch({ name, specialty, location, rating });
  };

  const handleReset = () => {
    // Réinitialise les champs locaux
    setName('');
    setSpecialty('');
    setLocation('');
    setRating('');
    // Demande au parent de tout réafficher
    onShowAll();
  };

  return (
    <div className="search-artisan">
      <form onSubmit={handleSubmit} className="search-artisan__form">
        
        {/* Champ Nom */}
        <div className="search-artisan__group">
          <input
            type="text"
            placeholder="Nom, entreprise..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            aria-label="Rechercher par nom"
          />
        </div>
        
        {/* Champ Spécialité */}
        <div className="search-artisan__group">
          <input
            type="text"
            placeholder="Spécialité (ex: Plombier)"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="form-control"
            aria-label="Rechercher par spécialité"
          />
        </div>

        {/* Champ Ville */}
        <div className="search-artisan__group">
          <input
            type="text"
            placeholder="Ville"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
            aria-label="Rechercher par ville"
          />
        </div>

        {/* Champ Note */}
        <div className="search-artisan__group">
           <select 
             value={rating} 
             onChange={(e) => setRating(e.target.value)}
             className="form-control"
             aria-label="Filtrer par note minimum"
           >
             <option value="">Note minimum</option>
             <option value="5">5 étoiles</option>
             <option value="4">4 étoiles et +</option>
             <option value="3">3 étoiles et +</option>
           </select>
        </div>

        {/* Boutons d'action */}
        <div className="search-artisan__actions">
          <button type="submit" className="btn btn-primary">Rechercher</button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">Tout voir</button>
        </div>
      </form>
    </div>
  );
}

SearchArtisan.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onShowAll: PropTypes.func.isRequired,
};