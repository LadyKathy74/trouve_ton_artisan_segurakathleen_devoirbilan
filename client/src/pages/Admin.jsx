import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Admin.scss';
import api from '../services/api';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // États pour le CRUD
  const [artisans, setArtisans] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  // Ajout de tous les champs du modèle Artisan
  const [form, setForm] = useState({ nom: '', email: '', ville: '', note: '', a_propos: '', site_web: '', id_specialite: '' });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;


  const handleLogin = (e) => {
    e.preventDefault();
    // Simulation d'authentification simple
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Identifiant ou mot de passe incorrect.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Charger les données une fois authentifié
  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [artisansData, specialitesData] = await Promise.all([
        api.getArtisans(),
        api.getSpecialties(),
      ]);
      setArtisans(artisansData || []);
      setSpecialites(specialitesData || []);
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err);
      setError("Impossible de charger les données du serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (artisan) => {
    setForm({
      nom: artisan.nom || '',
      email: artisan.email || '',
      ville: artisan.ville || '',
      note: artisan.note || '',
      a_propos: artisan.a_propos || '',
      site_web: artisan.site_web || '',
      id_specialite: artisan.Specialite?.id_specialite || artisan.id_specialite || '',
    });
    setEditId(artisan.id_artisan || artisan.id);
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet artisan ?')) {
      try {
        await api.deleteArtisan(id);
        alert('Artisan supprimé avec succès !');
        refreshData();
      } catch (err) {
        alert(`Erreur lors de la suppression : ${err.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (file) {
      formData.append('image', file);
    }

    try {
      if (editId) {
        await api.updateArtisan(editId, formData);
      } else {
        await api.createArtisan(formData);
      }
      alert(editId ? 'Artisan modifié avec succès !' : 'Artisan ajouté avec succès !');
      resetForm();
      refreshData();
    } catch (err) {
      alert(`Erreur lors de la sauvegarde : ${err.message}`);
    }
  };

  const resetForm = () => {
    setForm({ nom: '', email: '', ville: '', note: '', a_propos: '', site_web: '', id_specialite: '' });
    setFile(null);
    setEditId(null);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Logique de filtrage et de pagination
  const filteredArtisans = artisans.filter(artisan => {
    const searchLower = searchTerm.toLowerCase();
    if (!searchLower) return true; // Si la recherche est vide, on affiche tout

    return (
      artisan.nom?.toLowerCase().includes(searchLower) ||
      artisan.ville?.toLowerCase().includes(searchLower) ||
      artisan.Specialite?.nom_specialite?.toLowerCase().includes(searchLower)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArtisans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredArtisans.length / itemsPerPage);

  return (
    <div className="admin-page">
      <Header />
      <main className="admin-content container" id="main">
        <h1>Espace Administrateur</h1>

        {!isAuthenticated ? (
          <section className="login-section">
            <h2>Connexion</h2>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Identifiant</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ex: admin"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ex: admin"
                />
              </div>
              {error && !isAuthenticated && <p className="error-message" role="alert">{error}</p>}
              <button type="submit" className="btn btn--primary">Se connecter</button>
            </form>
          </section>
        ) : (
          <section className="dashboard-section">
            <div className="dashboard-header">
              <h2>Tableau de bord</h2>
              <button className="btn btn--secondary" onClick={handleLogout}>Déconnexion</button>
            </div>
            <p>Bienvenue dans l'interface de gestion du site "Trouve ton artisan".</p>

            <section className="crud-section">
              <h3>{editId ? 'Modifier un artisan' : 'Ajouter un nouvel artisan'}</h3>

              <form onSubmit={handleSubmit} className="artisan-form">
                <div className="form-row">
                  <input type="text" placeholder="Nom *" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required />
                  <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="form-row">
                  <input type="text" placeholder="Ville" value={form.ville} onChange={(e) => setForm({ ...form, ville: e.target.value })} />
                  <input type="number" step="0.1" min="0" max="5" placeholder="Note (0-5)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
                </div>
                <textarea placeholder="À propos de l'artisan..." value={form.a_propos} onChange={(e) => setForm({ ...form, a_propos: e.target.value })}></textarea>
                <div className="form-row">
                  <input type="url" placeholder="Site web (https://...)" value={form.site_web} onChange={(e) => setForm({ ...form, site_web: e.target.value })} />
                  <select value={form.id_specialite} onChange={(e) => setForm({ ...form, id_specialite: e.target.value })} required>
                    <option value="">-- Choisir une spécialité * --</option>
                    {specialites.map((s) => (
                      <option key={s.id_specialite || s.id} value={s.id_specialite || s.id}>
                        {s.nom_specialite || s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="fileInput">Image de l'artisan</label>
                  <input type="file" id="fileInput" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn--primary">{editId ? 'Mettre à jour' : 'Ajouter'}</button>
                  {editId && <button type="button" className="btn btn--secondary" onClick={resetForm}>Annuler</button>}
                </div>
              </form>

              <div className="list-header">
                <h3 className="list-title">Liste des artisans ({filteredArtisans.length})</h3>
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Rechercher par nom, ville..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Revenir à la page 1 lors d'une nouvelle recherche
                    }}
                  />
                </div>
              </div>

              {loading ? (
                <p>Chargement de la liste...</p>
              ) : (
                <div className="table-responsive">
                  <table className="artisans-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Spécialité</th>
                        <th>Ville</th>
                        <th>Note</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? currentItems.map((artisan) => (
                        <tr key={artisan.id_artisan || artisan.id}>
                          <td>
                            {artisan.image && (
                              <img 
                                src={`${API_URL}/images/${artisan.image}`} 
                                alt={artisan.nom} 
                                className="table-image"
                              />
                            )}
                          </td>
                          <td>{artisan.nom}</td>
                          <td>{artisan.Specialite?.nom_specialite || 'N/A'}</td>
                          <td>{artisan.ville}</td>
                          <td>{artisan.note}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn btn-sm btn--warning" onClick={() => handleEdit(artisan)}>Modifier</button>
                              <button className="btn btn-sm btn--danger" onClick={() => handleDelete(artisan.id_artisan || artisan.id)}>Supprimer</button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="6" className="no-data">Aucun artisan à afficher.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Contrôles de Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination-controls">
                      <button 
                        className="btn btn-sm btn--secondary" 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Précédent
                      </button>
                      <span>Page {currentPage} sur {totalPages}</span>
                      <button 
                        className="btn btn-sm btn--secondary" 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Suivant
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}