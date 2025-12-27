import React from "react";
import PropTypes from "prop-types";
import "../styles/ArtisanCard.scss";

/* ============================================
   Composant Rating (étoiles)
============================================ */
function Rating({ rating = 0 }) {
  const rounded = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  const stars = Array.from({ length: 5 }, (_, i) => i < rounded);

  return (
    <div
      className="artisan-card__rating"
      aria-label={`Note : ${rounded} sur 5`}
      role="img"
    >
      {stars.map((filled, i) => (
        <span
          key={i}
          className={`artisan-card__star ${filled ? "artisan-card__star--filled" : ""}`}
          aria-hidden="true"
        >
          {filled ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

/* ============================================
   Composant ArtisanCard
============================================ */
export default function ArtisanCard({
  specialty,
  image,
  name,
  description,
  location,
  rating = 0,
  className = "",
}) {
  return (
    <article
      className={`artisan-card ${className}`.trim()}
      aria-label={`Carte artisan : ${name}`}
    >
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={name}
          className="artisan-card__image"
        />
      )}

      {/* HEADER : note + spécialité */}
      <header className="artisan-card__header">
        <Rating rating={rating} />
        <div className="artisan-card__specialty">{specialty}</div>
      </header>

      {/* Nom */}
      <h3 className="artisan-card__title">{name}</h3>

      {/* Description */}
      <p className="artisan-card__description">{description}</p>

      {/* Localisation */}
      <div className="artisan-card__footer">
        <span className="artisan-card__location">{location}</span>
      </div>
    </article>
  );
}

ArtisanCard.propTypes = {
  specialty: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

ArtisanCard.defaultProps = {
  image: null,
  description: "",
  location: "",
  rating: 0,
  className: "",
};
