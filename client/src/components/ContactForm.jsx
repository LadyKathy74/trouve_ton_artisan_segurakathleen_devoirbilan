// ContactForm.jsx
import React, { useState } from 'react';
import '../styles/ContactForm.scss';
import Logo from "../assets/images/email.png";

const initialField = { value: '', state: 'idle', error: '' };

const VALIDATION = {
  nom: (v) => {
    const trimmed = v.trim();
    if (trimmed.length < 2) return 'Le nom doit contenir au moins 2 caractères.';
    const rx = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/u;
    if (!rx.test(trimmed)) return 'Le nom contient des caractères non autorisés.';
    return '';
  },
  email: (v) => {
    const trimmed = v.trim();
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rx.test(trimmed)) return 'Veuillez saisir une adresse email valide.';
    return '';
  },
  objet: (v) => {
    const trimmed = v.trim();
    if (trimmed.length < 3) return 'L’objet doit contenir au moins 3 caractères.';
    return '';
  },
  message: (v) => {
    const trimmed = v.trim();
    if (trimmed.length < 10) return 'Le message doit contenir au moins 10 caractères.';
    return '';
  },
};

const Field = ({ id, label, type = 'text', required = true, field, setField, placeholder, as = 'input' }) => {
  const onChange = (e) => {
    const value = e.target.value;
    setField((prev) => ({ ...prev, value, state: 'editing', error: '' }));
  };

  const onBlur = () => {
    const error = VALIDATION[id](field.value);
    setField((prev) => ({ ...prev, error, state: error ? 'error' : 'success' }));
  };

  const onFocus = () => {
    setField((prev) => ({ ...prev, state: prev.state === 'success' ? 'success' : 'editing' }));
  };

  const className = [
    'form-field',
    field.state === 'editing' && 'is-editing',
    field.state === 'error' && 'is-error',
    field.state === 'success' && 'is-success',
  ].filter(Boolean).join(' ');

  const ariaDescribedBy = `${id}-help`;

  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {label}{required && <span aria-hidden="true" className="req-star">*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          required={required}
          value={field.value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          aria-invalid={field.state === 'error'}
          aria-describedby={ariaDescribedBy}
          rows={6}
          className="form-control"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={field.value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          aria-invalid={field.state === 'error'}
          aria-describedby={ariaDescribedBy}
          className="form-control"
        />
      )}

      <div className="field-feedback" id={ariaDescribedBy}>
        {field.state === 'editing' && (
          <>
            <span className="icon icon--info" aria-hidden="true" />
            <span className="feedback-text">Saisie en cours…</span>
          </>
        )}
        {field.state === 'error' && (
          <>
            <span className="icon icon--error" aria-hidden="true" />
            <span className="feedback-text">{field.error}</span>
          </>
        )}
        {field.state === 'success' && (
          <>
            <span className="icon icon--success" aria-hidden="true" />
            <span className="feedback-text">Champ valide.</span>
          </>
        )}
      </div>
    </div>
  );
};

export default function ContactForm() {
  const [nom, setNom] = useState(initialField);
  const [email, setEmail] = useState(initialField);
  const [objet, setObjet] = useState(initialField);
  const [message, setMessage] = useState(initialField);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const nextNomErr = VALIDATION.nom(nom.value);
    const nextEmailErr = VALIDATION.email(email.value);
    const nextObjetErr = VALIDATION.objet(objet.value);
    const nextMessageErr = VALIDATION.message(message.value);

    setNom((p) => ({ ...p, error: nextNomErr, state: nextNomErr ? 'error' : 'success' }));
    setEmail((p) => ({ ...p, error: nextEmailErr, state: nextEmailErr ? 'error' : 'success' }));
    setObjet((p) => ({ ...p, error: nextObjetErr, state: nextObjetErr ? 'error' : 'success' }));
    setMessage((p) => ({ ...p, error: nextMessageErr, state: nextMessageErr ? 'error' : 'success' }));

    if (!nextNomErr && !nextEmailErr && !nextObjetErr && !nextMessageErr) {
      setSubmitted(true);
    }
  };

  const onBack = () => {
    setNom(initialField);
    setEmail(initialField);
    setObjet(initialField);
    setMessage(initialField);
    setSubmitted(false);
  };

  return (
    <div className="contact-wrapper">
      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <div className="form-header">
          <img src={Logo} alt="Logo email" className="form-logo" />
          <h2 className="form-title">Contactez l’artisan</h2>
        </div>

        <Field id="nom" label="Nom" field={nom} setField={setNom} placeholder="Votre nom" />
        <Field id="email" label="Email" type="email" field={email} setField={setEmail} placeholder="exemple@domaine.fr" />
        <Field id="objet" label="Objet" field={objet} setField={setObjet} placeholder="Sujet de votre demande" />
        <Field id="message" label="Message" field={message} setField={setMessage} placeholder="Décrivez votre demande" as="textarea" />

        <p className="privacy-note">
          Les informations recueillies à partir de ce formulaire sont nécessaires aux services de la région Auvergne‑Rhône‑Alpes pour la gestion de votre demande.
        </p>

        <div className="form-actions">
          <button type="button" className="btn btn--secondary" onClick={onBack}>Retour</button>
          <button type="submit" className="btn btn--primary">Envoyer</button>
        </div>

        {submitted && (
          <div className="submit-feedback" role="status">
            Votre demande a été envoyée avec succès.
          </div>
        )}
      </form>
    </div>
  );
}
